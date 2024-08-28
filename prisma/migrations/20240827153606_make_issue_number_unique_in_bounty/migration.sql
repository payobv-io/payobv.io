/*
  Warnings:

  - A unique constraint covering the columns `[issueNumber]` on the table `Bounty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bounty_issueNumber_key" ON "Bounty"("issueNumber");
