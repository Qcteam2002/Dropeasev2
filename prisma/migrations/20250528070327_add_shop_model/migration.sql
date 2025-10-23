/*
  Warnings:

  - You are about to drop the column `onboarded` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Session` DROP COLUMN `onboarded`;

-- AlterTable
ALTER TABLE `Shop` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
