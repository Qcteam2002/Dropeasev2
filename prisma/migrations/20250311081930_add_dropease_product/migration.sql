-- CreateTable
CREATE TABLE `DropeaseProduct` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `sourceProductId` BIGINT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `featuredMedia` VARCHAR(191) NULL,
    `images` JSON NULL,
    `variants` JSON NULL,
    `media` JSON NULL,
    `options` JSON NULL,
    `productType` VARCHAR(191) NULL,
    `collections` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rating` DOUBLE NULL DEFAULT 0,
    `reviewCount` INTEGER NULL DEFAULT 0,
    `reviews` JSON NULL,
    `detailedReviews` JSON NULL,
    `paymentMethods` JSON NULL,
    `shippingOptions` JSON NULL,
    `gridView` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
