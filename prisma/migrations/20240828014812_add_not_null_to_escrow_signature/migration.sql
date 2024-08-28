/*
  Warnings:

  - Made the column `signature` on table `Escrow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Escrow" ALTER COLUMN "signature" SET NOT NULL;
