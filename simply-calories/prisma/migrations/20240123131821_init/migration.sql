/*
  Warnings:

  - You are about to drop the `FastingSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FastingSession" DROP CONSTRAINT "FastingSession_userId_fkey";

-- DropTable
DROP TABLE "FastingSession";

-- CreateTable
CREATE TABLE "FastingResult" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fastingDuration" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FastingResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FastingResult" ADD CONSTRAINT "FastingResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
