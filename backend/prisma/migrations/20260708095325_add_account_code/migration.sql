/*
  Warnings:

  - A unique constraint covering the columns `[account_code]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_code` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `account_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `accounts_account_code_key` ON `accounts`(`account_code`);
