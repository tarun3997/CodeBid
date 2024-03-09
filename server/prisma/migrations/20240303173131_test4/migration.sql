-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_profile_id_fkey`;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
