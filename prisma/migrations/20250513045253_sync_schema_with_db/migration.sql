-- AlterTable
ALTER TABLE `PlatformProduct` MODIFY `featuredMedia` TEXT NULL;

-- AlterTable
ALTER TABLE `ProductsOptimized` ADD COLUMN `isOptimized` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `optimizedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `optimizedDescription` LONGTEXT NOT NULL;
