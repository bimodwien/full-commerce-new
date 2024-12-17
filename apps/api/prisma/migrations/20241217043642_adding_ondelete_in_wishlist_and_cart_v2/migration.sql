-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_productId_fkey`;

-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlists` DROP FOREIGN KEY `wishlists_productId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlists` DROP FOREIGN KEY `wishlists_userId_fkey`;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
