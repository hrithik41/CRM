-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_role` ENUM('USER', 'ADMIN', 'SUPER_ADMIN', 'SALES', 'DATA', 'PRODUCTION', 'SPONSORSHIP', 'OPERATION') NOT NULL DEFAULT 'USER',
    `user_department` ENUM('SALES', 'MARKETING', 'FINANCE', 'IT', 'HUMAN_RESOURCES') NOT NULL DEFAULT 'SALES',
    `user_password` VARCHAR(191) NOT NULL,
    `user_status` BOOLEAN NOT NULL DEFAULT true,
    `user_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_updated_at` DATETIME(3) NOT NULL,
    `user_deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_user_email_key`(`user_email`),
    INDEX `users_user_status_idx`(`user_status`),
    INDEX `users_user_deleted_at_idx`(`user_deleted_at`),
    INDEX `users_user_role_user_department_idx`(`user_role`, `user_department`),
    INDEX `users_user_name_idx`(`user_name`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `account_id` VARCHAR(191) NOT NULL,
    `account_owner_fk` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,
    `account_type` ENUM('CUSTOMER', 'PARTNER', 'PROSPECT', 'COMPETITER', 'RESELLER', 'DISTRIBUTOR') NOT NULL DEFAULT 'CUSTOMER',
    `account_phone` VARCHAR(191) NULL,
    `account_website` VARCHAR(191) NULL,
    `account_email` VARCHAR(191) NULL,
    `account_city` VARCHAR(191) NULL,
    `account_country` VARCHAR(191) NULL,
    `account_industry` VARCHAR(191) NULL,
    `account_employees_size` INTEGER NULL,
    `account_description` TEXT NULL,
    `account_account_status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `account_annual_revenue` DECIMAL(18, 2) NULL,
    `account_parent_fk` VARCHAR(191) NULL,
    `account_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `account_updated_at` DATETIME(3) NOT NULL,
    `account_deleted_at` DATETIME(3) NULL,

    INDEX `accounts_account_owner_fk_idx`(`account_owner_fk`),
    INDEX `accounts_account_account_status_idx`(`account_account_status`),
    INDEX `accounts_account_deleted_at_idx`(`account_deleted_at`),
    INDEX `accounts_account_country_account_city_idx`(`account_country`, `account_city`),
    INDEX `accounts_account_industry_idx`(`account_industry`),
    INDEX `accounts_account_parent_fk_idx`(`account_parent_fk`),
    INDEX `accounts_account_name_idx`(`account_name`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `contact_id` VARCHAR(191) NOT NULL,
    `contact_user_fk` VARCHAR(191) NULL,
    `contact_account_fk` VARCHAR(191) NULL,

    INDEX `contacts_contact_user_fk_idx`(`contact_user_fk`),
    INDEX `contacts_contact_account_fk_idx`(`contact_account_fk`),
    PRIMARY KEY (`contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunities` (
    `opportunity_id` VARCHAR(191) NOT NULL,
    `opportunity_name` VARCHAR(191) NOT NULL,
    `opportunity_stage` VARCHAR(191) NOT NULL,
    `opportunity_value` DOUBLE NOT NULL,
    `opportunity_close_date` DATETIME(3) NOT NULL,
    `opportunity_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `opportunity_updated_at` DATETIME(3) NOT NULL,
    `owner_id` VARCHAR(191) NULL,

    PRIMARY KEY (`opportunity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `task_id` VARCHAR(191) NOT NULL,
    `task_user_fk` VARCHAR(191) NULL,

    INDEX `tasks_task_user_fk_idx`(`task_user_fk`),
    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaigns` (
    `campaign_id` VARCHAR(191) NOT NULL,
    `campaign_user_fk` VARCHAR(191) NULL,

    INDEX `campaigns_campaign_user_fk_idx`(`campaign_user_fk`),
    PRIMARY KEY (`campaign_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing` (
    `billing_id` VARCHAR(191) NOT NULL,
    `billing_account_fk` VARCHAR(191) NULL,
    `billing_street` VARCHAR(191) NULL,
    `billing_state` VARCHAR(191) NULL,
    `billing_zip` VARCHAR(191) NULL,
    `billing_country` VARCHAR(191) NULL,
    `billing_city` VARCHAR(191) NULL,
    `billing_phone` VARCHAR(191) NULL,
    `billing_email` VARCHAR(191) NULL,

    INDEX `billing_billing_account_fk_idx`(`billing_account_fk`),
    PRIMARY KEY (`billing_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipping` (
    `shipping_id` VARCHAR(191) NOT NULL,
    `shipping_account_fk` VARCHAR(191) NULL,
    `shipping_street` VARCHAR(191) NULL,
    `shipping_state` VARCHAR(191) NULL,
    `shipping_zip` VARCHAR(191) NULL,
    `shipping_country` VARCHAR(191) NULL,
    `shipping_city` VARCHAR(191) NULL,
    `shipping_phone` VARCHAR(191) NULL,
    `shipping_email` VARCHAR(191) NULL,

    INDEX `shipping_shipping_account_fk_idx`(`shipping_account_fk`),
    PRIMARY KEY (`shipping_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_account_owner_fk_fkey` FOREIGN KEY (`account_owner_fk`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_account_parent_fk_fkey` FOREIGN KEY (`account_parent_fk`) REFERENCES `accounts`(`account_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_contact_user_fk_fkey` FOREIGN KEY (`contact_user_fk`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_contact_account_fk_fkey` FOREIGN KEY (`contact_account_fk`) REFERENCES `accounts`(`account_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunities` ADD CONSTRAINT `opportunities_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_task_user_fk_fkey` FOREIGN KEY (`task_user_fk`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_campaign_user_fk_fkey` FOREIGN KEY (`campaign_user_fk`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `billing` ADD CONSTRAINT `billing_billing_account_fk_fkey` FOREIGN KEY (`billing_account_fk`) REFERENCES `accounts`(`account_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shipping` ADD CONSTRAINT `shipping_shipping_account_fk_fkey` FOREIGN KEY (`shipping_account_fk`) REFERENCES `accounts`(`account_id`) ON DELETE SET NULL ON UPDATE CASCADE;
