type Nutrients = {
  ENERC_KCAL: number;
  PROCNT: number;
  FAT: number;
  CHOCDF: number;
  FIBTG: number;
};

export type CalculatedNutrients = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
};

export const calculateNutrientsForAmount = (
  nutrients: Nutrients,
  amountConsumed: number
): CalculatedNutrients => {
  const factor = amountConsumed / 100;
  return {
    calories: nutrients.ENERC_KCAL * factor,
    protein: nutrients.PROCNT * factor,
    fat: nutrients.FAT * factor,
    carbs: nutrients.CHOCDF * factor,
    fiber: nutrients.FIBTG * factor,
  };
};
