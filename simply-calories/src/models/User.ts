export interface BMRResult {
  id: string;
  userId: string;
  height: number;
  weight: number;
  gender: string;
  activityLevel: string;
  deficitLevel10: number;
  deficitLevel20: number;
  deficitLevel30: number;
  tdee: number;
  calculatedValueCalories10: number;
  calculatedValueKilos10: number;
  calculatedValueCalories20: number;
  calculatedValueKilos20: number;
  calculatedValueCalories30: number;
  calculatedValueKilos30: number;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  name: string | null;
  email: string;
  bmrResults: BMRResult[];
  foodConsumption: foodConsumption[];
}

export interface foodConsumption {
  id: string;
  userId: string;
  foodName: string;
  amount: number;
  calories: number;
  dateConsumed: string;
}
