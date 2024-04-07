-- AlterTable
ALTER TABLE `notification` ADD COLUMN `postId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Project`(`project_id`) ON DELETE SET NULL ON UPDATE CASCADE;
