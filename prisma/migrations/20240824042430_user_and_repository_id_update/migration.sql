-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Repository_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
