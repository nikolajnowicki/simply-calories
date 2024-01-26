-- AlterTable
ALTER TABLE "User" ADD COLUMN     "caloricGoal" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "FoodConsumption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "dateConsumed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodConsumption_userId_dateConsumed_idx" ON "FoodConsumption"("userId", "dateConsumed");

-- AddForeignKey
ALTER TABLE "FoodConsumption" ADD CONSTRAINT "FoodConsumption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
