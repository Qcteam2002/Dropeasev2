/*
  Warnings:

  - Added the required column `handle` to the `PlatformProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PlatformProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PlatformProduct` ADD COLUMN `descriptionHtml` VARCHAR(191) NULL,
    ADD COLUMN `featuredMedia` VARCHAR(191) NULL,
    ADD COLUMN `handle` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `platformId` VARCHAR(191) NULL;
