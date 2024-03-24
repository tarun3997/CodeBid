/*
  Warnings:

  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `conversationId` on the `message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_conversationId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP PRIMARY KEY,
    DROP COLUMN `conversationId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `_ConversationToMessage` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ConversationToMessage_AB_unique`(`A`, `B`),
    INDEX `_ConversationToMessage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ConversationToMessage` ADD CONSTRAINT `_ConversationToMessage_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationToMessage` ADD CONSTRAINT `_ConversationToMessage_B_fkey` FOREIGN KEY (`B`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
