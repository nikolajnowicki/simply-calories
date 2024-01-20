/*
  Warnings:

  - Added the required column `tdee` to the `BMRResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BMRResult" ADD COLUMN     "tdee" DOUBLE PRECISION NOT NULL;
