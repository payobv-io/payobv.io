/*
  Warnings:

  - A unique constraint covering the columns `[signature]` on the table `Escrow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Escrow" ADD COLUMN     "signature" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Escrow_signature_key" ON "Escrow"("signature");
