/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    MODIFY `userId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `PricingModule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `is_default` BOOLEAN NULL DEFAULT true,
    `available` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PricingFeature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cycle` INTEGER NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PricingModuleFeature` (
    `moduleId` INTEGER NOT NULL,
    `featureId` VARCHAR(191) NOT NULL,
    `limit_quantity` INTEGER NOT NULL,
    `cycle` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`moduleId`, `featureId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(191) NOT NULL,
    `userId` BIGINT NOT NULL,
    `start_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `next_billing_time` DATETIME(3) NULL,
    `external_subscription_id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `is_trial` BOOLEAN NULL DEFAULT false,
    `is_test` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Subscription_userId_status_idx`(`userId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionQuota` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `feature_id` VARCHAR(191) NOT NULL,
    `limit_quantity` INTEGER NOT NULL,
    `used_quantity` INTEGER NOT NULL,
    `type` ENUM('SUBSCRIPTION', 'EXTRA') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `SubscriptionQuota_userId_feature_id_idx`(`userId`, `feature_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsageLog` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `feature_id` VARCHAR(191) NOT NULL,
    `used_quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `UsageLog_userId_feature_id_idx`(`userId`, `feature_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentLog` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `status` ENUM('CREATED', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'CREATED',
    `external_transaction_id` VARCHAR(191) NULL,
    `details` JSON NULL,
    `amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PaymentLog_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SourceProduct` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `source` ENUM('ALIEXPRESS', 'SHOPIFY', 'EBAY', 'AMAZON', 'WISH') NOT NULL,
    `sourceUrl` VARCHAR(191) NOT NULL,
    `sourceId` VARCHAR(191) NULL,
    `comparePrice` DOUBLE NULL,
    `estProfit` DOUBLE NULL,
    `rating` DOUBLE NULL,
    `totalRating` INTEGER NULL,
    `like` INTEGER NULL,
    `share` INTEGER NULL,
    `comment` INTEGER NULL,
    `tiktokUrl` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SourceCategory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `source` ENUM('ALIEXPRESS', 'SHOPIFY', 'EBAY', 'AMAZON', 'WISH') NOT NULL,
    `sourceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformProduct` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `platformId` VARCHAR(191) NOT NULL,
    `sourceProductId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `metafields` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Session_id_key` ON `Session`(`id`);

-- AddForeignKey
ALTER TABLE `PricingModuleFeature` ADD CONSTRAINT `PricingModuleFeature_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `PricingModule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PricingModuleFeature` ADD CONSTRAINT `PricingModuleFeature_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `PricingFeature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `PricingModule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Session`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionQuota` ADD CONSTRAINT `SubscriptionQuota_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Session`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionQuota` ADD CONSTRAINT `SubscriptionQuota_feature_id_fkey` FOREIGN KEY (`feature_id`) REFERENCES `PricingFeature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageLog` ADD CONSTRAINT `UsageLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Session`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageLog` ADD CONSTRAINT `UsageLog_feature_id_fkey` FOREIGN KEY (`feature_id`) REFERENCES `PricingFeature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentLog` ADD CONSTRAINT `PaymentLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Session`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformProduct` ADD CONSTRAINT `PlatformProduct_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Session`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformProduct` ADD CONSTRAINT `PlatformProduct_sourceProductId_fkey` FOREIGN KEY (`sourceProductId`) REFERENCES `SourceProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
