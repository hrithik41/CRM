import { useState, useEffect } from "react";
import {
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Loader2,
} from "lucide-react";
import AddAccountModal from "../components/AddAccountModal";
import Button from "../components/ui/button";
import { api } from "../utils/api";

const ResizableHeader = ({ children, initialWidth }) => {
  const [width, setWidth] = useState(initialWidth || 150);

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent) => {
      setWidth(Math.max(50, startWidth + moveEvent.clientX - startX));
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <th
      className="relative border-r border-b border-slate-200 px-4 py-3 font-semibold tracking-wider text-[11px] uppercase text-slate-500 bg-slate-50 select-none whitespace-nowrap"
      style={{ width: width, minWidth: width, maxWidth: width }}
    >
      <div className="overflow-hidden text-ellipsis w-full pr-2">
        {children}
      </div>
      <div
        className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-blue-400 z-10 transition-colors"
        onMouseDown={startResize}
      />
    </th>
  );
};

const Accounts = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAccounts();
    }, 300); // 300ms debounce for search

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const query = `?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
      }`;
      console.log(query);
      const response = await api.get(`/api/accounts${query}`);
      if (response.success) {
        setAccountsData(response.data);
        console.log("response Data", response.data);
        setTotalRecords(response.pagination.totalRecords);
      }
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(accountsData.map((acc) => acc.account_id));
      setSelectAll(true);
    }
  };

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedRows, id];
      setSelectedRows(newSelected);
      if (newSelected.length === accountsData.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fade-in">
      {/* Section 1: Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-200 shadow-sm z-10 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Accounts
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Total Records: {totalRecords}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="default"
            className="gap-2 text-slate-700 font-semibold shadow-sm border-slate-300"
          >
            <Upload size={16} className="text-slate-500" />
            Import
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="gap-2 text-slate-700 font-semibold shadow-sm border-slate-300"
          >
            <Download size={16} className="text-slate-500" />
            Export
          </Button>
          <Button
            variant="default"
            size="default"
            className="gap-2 font-semibold shadow-sm bg-[#0066cc] hover:bg-[#0055b3]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            Add Account
          </Button>
        </div>
      </div>

      {/* Section 2: Filters and Search */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search accounts..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          {selectedRows.length > 0 && (
            <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
              {selectedRows.length} selected
            </span>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 text-slate-600 shadow-sm border-slate-300"
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>
      </div>

      {/* Section 3: Data Table */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
          <div className="overflow-auto flex-1 bg-white relative">
            <table
              className="w-full text-left text-sm border-collapse"
              style={{ tableLayout: "fixed" }}
            >
              <thead className="sticky top-0 z-20 shadow-[0_1px_0_rgba(226,232,240,1)] bg-slate-50">
                <tr>
                  <th className="border-r border-b border-slate-200 px-4 py-3 bg-slate-50 w-12 min-w-[48px] max-w-[48px] text-center z-20">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <ResizableHeader initialWidth={200}>
                    ACCOUNT ID
                  </ResizableHeader>
                  <ResizableHeader initialWidth={300}>
                    ACCOUNT NAME
                  </ResizableHeader>
                  <ResizableHeader initialWidth={150}>
                    EMPLOYEE SIZE
                  </ResizableHeader>
                  <ResizableHeader initialWidth={250}>INDUSTRY</ResizableHeader>
                  <ResizableHeader initialWidth={300}>CITY</ResizableHeader>
                  <th className="border-b border-slate-200 px-4 py-3 font-semibold tracking-wider text-[11px] uppercase text-slate-500 bg-slate-50 w-24 min-w-[96px] text-center sticky right-0 shadow-[-1px_0_0_rgba(226,232,240,1)] z-20">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2
                          className="animate-spin text-blue-500"
                          size={24}
                        />
                        <span>Loading accounts...</span>
                      </div>
                    </td>
                  </tr>
                ) : accountsData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center text-slate-500 font-medium"
                    >
                      No accounts found.
                    </td>
                  </tr>
                ) : (
                  accountsData.map((acc, index) => (
                    <tr
                      key={acc.account_id}
                      className={`hover:bg-blue-50/50 group ${selectedRows.includes(acc.account_id) ? "bg-blue-50/30" : ""}`}
                    >
                      <td className="border-r border-slate-100 px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          checked={selectedRows.includes(acc.account_id)}
                          onChange={() => toggleRow(acc.account_id)}
                        />
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-xs text-slate-500 font-mono truncate">
                        {acc.account_code}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 font-semibold text-[#0066cc] hover:underline cursor-pointer truncate">
                        {acc.account_name}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {acc.account_employees_size || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {acc.account_industry || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {acc.account_city || "-"}
                      </td>
                      <td
                        className={`px-4 py-3 text-center sticky right-0 group-hover:bg-blue-50/50 shadow-[-1px_0_0_rgba(241,245,249,1)] ${selectedRows.includes(acc.account_id) ? "bg-blue-50/30" : "bg-white"}`}
                      >
                        <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Placeholder */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalRecords)} of {totalRecords}{" "}
              records
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs px-3 shadow-sm border-slate-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs px-3 shadow-sm border-slate-300"
                disabled={currentPage * limit >= totalRecords}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchAccounts}
      />
    </div>
  );
};
export default Accounts;
