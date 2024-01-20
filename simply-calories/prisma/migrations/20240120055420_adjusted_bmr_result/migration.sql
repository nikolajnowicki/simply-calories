/*
  Warnings:

  - Added the required column `calculatedValueCalories10` to the `BMRResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedValueCalories20` to the `BMRResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedValueCalories30` to the `BMRResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedValueKilos10` to the `BMRResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedValueKilos20` to the `BMRResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedValueKilos30` to the `BMRResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BMRResult" ADD COLUMN     "calculatedValueCalories10" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculatedValueCalories20" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculatedValueCalories30" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculatedValueKilos10" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculatedValueKilos20" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculatedValueKilos30" DOUBLE PRECISION NOT NULL;
