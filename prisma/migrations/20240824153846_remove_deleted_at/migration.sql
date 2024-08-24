/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `RepositoryUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "RepositoryUser" DROP COLUMN "deletedAt";
