type Gender = "male" | "female";

interface ActivityLevel {
  [key: string]: number;
}

export const calcBmr = (
  age: number,
  height: number,
  weight: number,
  gender: Gender
): number => {
  const maleStartValue = 88.362;
  const maleWeightMulti = 13.397;
  const maleHeightMulti = 4.799;
  const maleAgeMulti = 5.677;

  const femaleStartValue = 447.593;
  const femaleWeightMulti = 9.247;
  const femaleHeightMulti = 3.098;
  const femaleAgeMulti = 4.33;

  return gender === "male"
    ? maleStartValue +
        maleWeightMulti * weight +
        maleHeightMulti * height -
        maleAgeMulti * age
    : femaleStartValue +
        femaleWeightMulti * weight +
        femaleHeightMulti * height -
        femaleAgeMulti * age;
};

export const calcTotalDailyEnergyExpenditure = (
  bmr: number,
  exerciseFrequency: string
): number => {
  const activityLevel: ActivityLevel = {
    Sedentary: 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extra Active": 1.9,
  };

  return bmr * (activityLevel[exerciseFrequency] || 1);
};
