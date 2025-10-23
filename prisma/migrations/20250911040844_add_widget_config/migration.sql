/*
  Warnings:

  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Shop`;

-- CreateTable
CREATE TABLE `WidgetConfig` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopDomain` VARCHAR(191) NOT NULL,
    `buttonText` VARCHAR(191) NOT NULL DEFAULT '👗 Try-On',
    `colorHex` VARCHAR(191) NOT NULL DEFAULT '#3B82F6',
    `position` ENUM('BEFORE_ATC', 'AFTER_ATC', 'FLOATING', 'CUSTOM_SELECTOR') NOT NULL DEFAULT 'AFTER_ATC',
    `customSelector` VARCHAR(191) NULL,
    `whiteLabel` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WidgetConfig_shopDomain_key`(`shopDomain`),
    INDEX `WidgetConfig_shopDomain_idx`(`shopDomain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
