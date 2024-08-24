-- AlterTable
ALTER TABLE "Bounty" ALTER COLUMN "status" SET DEFAULT 'PENDING_ESCROW';

-- AlterTable
ALTER TABLE "Escrow" ALTER COLUMN "status" SET DEFAULT 'FUNDED';

-- DropEnum
DROP TYPE "TransactionStatus";
