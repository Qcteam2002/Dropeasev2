-- AlterTable
ALTER TABLE `WidgetConfig` MODIFY `buttonText` VARCHAR(191) NOT NULL DEFAULT '👗 Virtual Try-On';

-- CreateTable
CREATE TABLE `ProductOptimizationSettings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `keywords` JSON NULL,
    `persona` TEXT NULL,
    `painpoints` JSON NULL,
    `tone` VARCHAR(191) NULL,
    `targetMarket` VARCHAR(191) NULL,
    `languageOutput` VARCHAR(191) NULL,
    `optimizationType` VARCHAR(191) NULL,
    `marketInsights` JSON NULL,
    `segmentations` JSON NULL,
    `selectedSegment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductOptimizationSettings_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductOptimizationSettings` ADD CONSTRAINT `ProductOptimizationSettings_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `PlatformProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
