/*
  Warnings:

  - You are about to alter the column `isPaid` on the `project` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `isPaid` ENUM('Paid', 'Free') NOT NULL DEFAULT 'Free';
