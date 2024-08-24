/*
  Warnings:

  - Changed the type of `installationId` on the `Repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "installationId",
ADD COLUMN     "installationId" INTEGER NOT NULL;
