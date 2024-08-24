/*
  Warnings:

  - A unique constraint covering the columns `[publicAddress]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wallet_publicAddress_key" ON "Wallet"("publicAddress");
