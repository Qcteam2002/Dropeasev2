/*
  Warnings:

  - You are about to drop the column `sessionId` on the `PaymentLog` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `PlatformProduct` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `SubscriptionQuota` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `UsageLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `PaymentLog` DROP FOREIGN KEY `PaymentLog_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `PlatformProduct` DROP FOREIGN KEY `PlatformProduct_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `SubscriptionQuota` DROP FOREIGN KEY `SubscriptionQuota_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `UsageLog` DROP FOREIGN KEY `UsageLog_sessionId_fkey`;

-- DropIndex
DROP INDEX `PaymentLog_sessionId_fkey` ON `PaymentLog`;

-- DropIndex
DROP INDEX `PlatformProduct_sessionId_fkey` ON `PlatformProduct`;

-- DropIndex
DROP INDEX `Subscription_sessionId_fkey` ON `Subscription`;

-- DropIndex
DROP INDEX `SubscriptionQuota_sessionId_fkey` ON `SubscriptionQuota`;

-- DropIndex
DROP INDEX `UsageLog_sessionId_fkey` ON `UsageLog`;

-- AlterTable
ALTER TABLE `PaymentLog` DROP COLUMN `sessionId`;

-- AlterTable
ALTER TABLE `PlatformProduct` DROP COLUMN `sessionId`;

-- AlterTable
ALTER TABLE `Session` ADD COLUMN `userId` BIGINT NULL,
    ADD PRIMARY KEY (`id`);

-- DropIndex
DROP INDEX `Session_id_key` ON `Session`;

-- AlterTable
ALTER TABLE `SubscriptionQuota` DROP COLUMN `sessionId`;

-- AlterTable
ALTER TABLE `UsageLog` DROP COLUMN `sessionId`;
