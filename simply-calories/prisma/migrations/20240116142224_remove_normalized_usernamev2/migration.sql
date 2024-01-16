/*
  Warnings:

  - You are about to drop the column `normalizedUsername` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_normalizedUsername_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "normalizedUsername";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
