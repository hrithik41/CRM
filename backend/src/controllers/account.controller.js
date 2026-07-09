import { prisma } from "../lib/prisma.js";

// GET /api/accounts
// Fetches accounts with support for search, pagination, and sorting
export const getAccounts = async (req, res) => {
  try {
    const { page = 1, limit = 50, search = "" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build the where clause for search
    const where = {
      account_deleted_at: null, // Only fetch non-deleted accounts
    };

    if (search) {
      where.OR = [
        { account_name: { contains: search } },
        { account_industry: { contains: search } },
        { account_city: { contains: search } },
      ];
    }

    // Run both count and findMany concurrently for better performance
    const [accounts, totalRecords] = await Promise.all([
      prisma.account.findMany({
        where,
        skip,
        take,
        orderBy: { account_created_at: "desc" },
        include: {
          owner: {
            select: { user_id: true }, // Fetch the owner's name so we can display it in the table
          },
        },
      }),
      prisma.account.count({ where }),
    ]);

    console.log("Accounts Fetched Successfully");

    res.status(200).json({
      success: true,
      data: accounts,
      pagination: {
        totalRecords,
        currentPage: Number(page),
        totalPages: Math.ceil(totalRecords / take),
      },
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// GET /api/accounts/:id
// Fetches a single account by ID (useful for the "View" action)
export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findUnique({
      where: { account_id: id },
      include: {
        owner: {
          select: { user_name: true, user_email: true },
        },
      },
    });

    if (!account || account.account_deleted_at) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    res.status(200).json({ success: true, data: account });
  } catch (error) {
    console.error("Error fetching account:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// POST /api/accounts
// Creates a new account (useful for the "Add Account" action)
export const createAccount = async (req, res) => {
  try {
    const {
      account_name,
      account_owner_fk,
      account_industry,
      account_employees_size,
      account_city,
      account_website,
      account_type,
      account_phone,
      account_email,
      account_country,
      account_description,
      account_account_status,
      account_annual_revenue,
      
      // Billing
      billing_street,
      billing_city,
      billing_state,
      billing_zip,
      billing_country,

      // Shipping
      shipping_street,
      shipping_city,
      shipping_state,
      shipping_zip,
      shipping_country
    } = req.body;

    if (!account_name || !account_owner_fk) {
      return res.status(400).json({
        success: false,
        message: "Account name and owner are required",
      });
    }

    const lastAccount = await prisma.account.findFirst({
      orderBy: { account_created_at: "desc" },
      select: { account_code: true },
    });
    let newCodeNumber = 1;
    if (lastAccount && lastAccount.account_code) {
      const lastNumber = parseInt(lastAccount.account_code.split("-")[1], 10);
      if (!isNaN(lastNumber)) {
        newCodeNumber = lastNumber + 1;
      }
    }
    const generatedCode = `ACC-${String(newCodeNumber).padStart(6, "0")}`;

    const billingData = (billing_street || billing_city || billing_state || billing_zip || billing_country) ? {
      create: {
        billing_street,
        billing_city,
        billing_state,
        billing_zip,
        billing_country
      }
    } : undefined;

    const shippingData = (shipping_street || shipping_city || shipping_state || shipping_zip || shipping_country) ? {
      create: {
        shipping_street,
        shipping_city,
        shipping_state,
        shipping_zip,
        shipping_country
      }
    } : undefined;

    const newAccount = await prisma.account.create({
      data: {
        account_code: generatedCode,
        account_name,
        account_owner_fk,
        account_type,
        account_phone,
        account_email,
        account_city,
        account_country,
        account_industry,
        account_description,
        account_account_status,
        account_website,
        account_employees_size: account_employees_size
          ? Number(account_employees_size)
          : null,
        account_annual_revenue: account_annual_revenue
          ? parseFloat(account_annual_revenue)
          : null,
        account_billing_address: billingData,
        account_shipping_address: shippingData,
      },
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: newAccount,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// PUT /api/accounts/:id
// Updates an existing account (useful for the "Edit" action)
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert employee size to number if present in update
    if (updateData.account_employees_size) {
      updateData.account_employees_size = Number(
        updateData.account_employees_size,
      );
    }

    const updatedAccount = await prisma.account.update({
      where: { account_id: id },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: updatedAccount,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// DELETE /api/accounts
// Deletes multiple accounts (useful when selecting rows via checkboxes and hitting a delete button)
export const deleteAccounts = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of account_ids from the frontend

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of account IDs to delete",
      });
    }

    // Soft delete approach based on your schema having account_deleted_at
    await prisma.account.updateMany({
      where: {
        account_id: { in: ids },
      },
      data: {
        account_deleted_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: `${ids.length} accounts deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting accounts:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
