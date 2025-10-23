-- AlterTable
ALTER TABLE `WidgetConfig` ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `buttonText` VARCHAR(191) NOT NULL DEFAULT '👗 Virtual Try-On';
