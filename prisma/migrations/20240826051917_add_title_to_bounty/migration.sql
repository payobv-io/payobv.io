/*
  Warnings:

  - Added the required column `title` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounty" ADD COLUMN     "title" TEXT NOT NULL;
