/*
  Warnings:

  - You are about to drop the column `gridView` on the `ProductsOptimized` table. All the data in the column will be lost.
  - You are about to drop the column `optimizedDescription` on the `ProductsOptimized` table. All the data in the column will be lost.
  - You are about to drop the column `optimizedTitle` on the `ProductsOptimized` table. All the data in the column will be lost.
  - Added the required column `grid_view` to the `ProductsOptimized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optimized_description` to the `ProductsOptimized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optimized_title` to the `ProductsOptimized` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductsOptimized` DROP COLUMN `gridView`,
    DROP COLUMN `optimizedDescription`,
    DROP COLUMN `optimizedTitle`,
    ADD COLUMN `grid_view` JSON NOT NULL,
    ADD COLUMN `optimized_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `optimized_title` VARCHAR(191) NOT NULL;
