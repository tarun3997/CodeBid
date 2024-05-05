/*
  Warnings:

  - A unique constraint covering the columns `[userId,projectId]` on the table `Saved` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Saved_userId_projectId_key` ON `Saved`(`userId`, `projectId`);
