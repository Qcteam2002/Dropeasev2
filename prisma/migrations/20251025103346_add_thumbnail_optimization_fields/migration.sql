-- AlterTable
ALTER TABLE `ProductsOptimized` ADD COLUMN `optimizedThumbnail` TEXT NULL,
    ADD COLUMN `optimizedThumbnailVariantId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `WidgetConfig` MODIFY `buttonText` VARCHAR(191) NOT NULL DEFAULT '👗 Virtual Try-On';
