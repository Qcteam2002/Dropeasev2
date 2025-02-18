/*
  Warnings:

  - A unique constraint covering the columns `[userId,platformId]` on the table `PlatformProduct` will be added. If there are existing duplicate values, this will fail.
  - Made the column `platformId` on table `PlatformProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `PlatformProduct` DROP FOREIGN KEY `PlatformProduct_sourceProductId_fkey`;

-- DropIndex
DROP INDEX `PlatformProduct_sourceProductId_fkey` ON `PlatformProduct`;

-- AlterTable
ALTER TABLE `PlatformProduct` MODIFY `platformId` VARCHAR(191) NOT NULL,
    MODIFY `sourceProductId` BIGINT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PlatformProduct_userId_platformId_key` ON `PlatformProduct`(`userId`, `platformId`);

-- AddForeignKey
ALTER TABLE `PlatformProduct` ADD CONSTRAINT `PlatformProduct_sourceProductId_fkey` FOREIGN KEY (`sourceProductId`) REFERENCES `SourceProduct`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
