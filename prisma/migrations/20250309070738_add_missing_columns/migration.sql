/*
  Warnings:

  - You are about to drop the column `grid_view` on the `ProductsOptimized` table. All the data in the column will be lost.
  - You are about to drop the column `optimized_description` on the `ProductsOptimized` table. All the data in the column will be lost.
  - You are about to drop the column `optimized_title` on the `ProductsOptimized` table. All the data in the column will be lost.
  - Added the required column `gridView` to the `ProductsOptimized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optimizedDescription` to the `ProductsOptimized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optimizedTitle` to the `ProductsOptimized` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PlatformProduct` ADD COLUMN `collections` JSON NULL,
    ADD COLUMN `images` JSON NULL,
    ADD COLUMN `media` JSON NULL,
    ADD COLUMN `options` JSON NULL,
    ADD COLUMN `productType` VARCHAR(191) NULL,
    ADD COLUMN `publishedAt` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `tags` VARCHAR(191) NULL,
    ADD COLUMN `variants` JSON NULL,
    ADD COLUMN `vendor` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductsOptimized` DROP COLUMN `grid_view`,
    DROP COLUMN `optimized_description`,
    DROP COLUMN `optimized_title`,
    ADD COLUMN `gridView` JSON NOT NULL,
    ADD COLUMN `optimizedDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `optimizedTitle` VARCHAR(191) NOT NULL;
