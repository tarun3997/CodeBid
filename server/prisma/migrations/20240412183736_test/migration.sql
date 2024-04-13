-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SuperAdmin', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- RenameIndex
ALTER TABLE `comment` RENAME INDEX `Comment_projectId_fkey` TO `Comment_projectId_index`;
