/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `location` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileUrl` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`;
