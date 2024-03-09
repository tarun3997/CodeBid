/*
  Warnings:

  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ratting` DROP FOREIGN KEY `Ratting_projectId_fkey`;

-- AlterTable
ALTER TABLE `comment` MODIFY `projectId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `like` MODIFY `projectId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    MODIFY `project_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`project_id`);

-- AlterTable
ALTER TABLE `ratting` MODIFY `projectId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PostImage` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostImage` ADD CONSTRAINT `PostImage_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratting` ADD CONSTRAINT `Ratting_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
