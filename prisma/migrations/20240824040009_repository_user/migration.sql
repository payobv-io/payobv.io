/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RepositoryUserRole" AS ENUM ('MAINTAINER', 'CONTRIBUTOR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "installationId" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepositoryUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "repositoryId" INTEGER NOT NULL,
    "role" "RepositoryUserRole" NOT NULL DEFAULT 'MAINTAINER',

    CONSTRAINT "RepositoryUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryUser_userId_repositoryId_key" ON "RepositoryUser"("userId", "repositoryId");

-- CreateIndex
CREATE INDEX "User_githubId_idx" ON "User"("githubId");

-- AddForeignKey
ALTER TABLE "RepositoryUser" ADD CONSTRAINT "RepositoryUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryUser" ADD CONSTRAINT "RepositoryUser_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
