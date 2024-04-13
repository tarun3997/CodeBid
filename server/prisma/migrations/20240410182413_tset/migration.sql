/*
  Warnings:

  - You are about to drop the column `isPaid` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `project_Price` on the `project` table. All the data in the column will be lost.
  - Added the required column `postLocation` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `isPaid`,
    DROP COLUMN `project_Price`,
    ADD COLUMN `postLocation` VARCHAR(191) NOT NULL;
