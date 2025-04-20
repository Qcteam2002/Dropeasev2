-- CreateTable
CREATE TABLE `ProductsOptimized` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `optimizedTitle` VARCHAR(191) NOT NULL,
    `optimizedDescription` LONGTEXT NOT NULL,
    `gridView` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ProductsOptimized_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductsOptimized` ADD CONSTRAINT `ProductsOptimized_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `PlatformProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
