/*
  Warnings:

  - A unique constraint covering the columns `[issueNumber,repositoryId]` on the table `Bounty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bounty_issueNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Bounty_issueNumber_repositoryId_key" ON "Bounty"("issueNumber", "repositoryId");
