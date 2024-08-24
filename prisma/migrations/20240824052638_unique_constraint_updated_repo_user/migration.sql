/*
  Warnings:

  - A unique constraint covering the columns `[userId,repositoryId,role]` on the table `RepositoryUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RepositoryUser_userId_repositoryId_key";

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryUser_userId_repositoryId_role_key" ON "RepositoryUser"("userId", "repositoryId", "role");
