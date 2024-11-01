-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `notificationType` ENUM('ALERT', 'MESSAGE') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
