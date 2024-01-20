import React, { useState, useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import FormFieldBmr from "../../components/shared/input/FormFieldBmr";
import {
  calcBmr,
  calcTotalDailyEnergyExpenditure,
} from "../../utils/bmrCalcValues";
import { saveBmrData } from "../../app/actions/users/saveBmrData";

type FormData = {
  age: number;
  height: number;
  weight: number;
  gender: "male" | "female";
  exerciseFrequency: string;
};

type CalorieData = {
  calories: number;
  weightLoss: number;
  newDailyCaloricIntake: number;
  weeklyWeightLoss: number;
};

const BmrCalculator: React.FC = () => {
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;
  const [tdee, setTdee] = useState<number | null>(null);
  const [deficitInfo, setDeficitInfo] = useState<{
    deficit10: CalorieData;
    deficit20: CalorieData;
    deficit30: CalorieData;
  } | null>(null);

  const { data: sessionData } = useSession();
  const session = sessionData as any;

  const resultsRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const calculateDeficitInfo = (
    tdeeResult: number,
    deficitPercentage: number
  ): CalorieData => {
    const caloriesPerKilo = 7700;
    const dailyDeficitCalories = (tdeeResult * deficitPercentage) / 100;
    const weeklyWeightLoss = (dailyDeficitCalories * 7) / caloriesPerKilo;
    const newDailyCaloricIntake = tdeeResult - dailyDeficitCalories;
    return {
      calories: dailyDeficitCalories,
      weightLoss: weeklyWeightLoss,
      newDailyCaloricIntake: newDailyCaloricIntake,
      weeklyWeightLoss: weeklyWeightLoss,
    };
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const bmrResult = calcBmr(data.age, data.height, data.weight, data.gender);
    const tdeeResult = calcTotalDailyEnergyExpenditure(
      bmrResult,
      data.exerciseFrequency
    );

    setTdee(Math.floor(tdeeResult));
    const newDeficitInfo = {
      deficit10: calculateDeficitInfo(tdeeResult, 10),
      deficit20: calculateDeficitInfo(tdeeResult, 20),
      deficit30: calculateDeficitInfo(tdeeResult, 30),
    };
    setDeficitInfo(newDeficitInfo);

    if (session?.user?.email) {
      await saveBmrData({
        email: session.user.email,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        activityLevel: data.exerciseFrequency,
        tdee: tdeeResult,
        deficitLevel10: newDeficitInfo.deficit10.calories,
        deficitLevel20: newDeficitInfo.deficit20.calories,
        deficitLevel30: newDeficitInfo.deficit30.calories,
        calculatedValueCalories10:
          newDeficitInfo.deficit10.newDailyCaloricIntake,
        calculatedValueKilos10: newDeficitInfo.deficit10.weeklyWeightLoss,
        calculatedValueCalories20:
          newDeficitInfo.deficit20.newDailyCaloricIntake,
        calculatedValueKilos20: newDeficitInfo.deficit20.weeklyWeightLoss,
        calculatedValueCalories30:
          newDeficitInfo.deficit30.newDailyCaloricIntake,
        calculatedValueKilos30: newDeficitInfo.deficit30.weeklyWeightLoss,
      });
    }
  };

  return (
    <div className=" items-center justify-center max-w-96 py-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="bmr-calculator-form">
          <FormFieldBmr
            label="Age"
            name="age"
            type="number"
            min={15}
            max={120}
          />
          <FormFieldBmr
            label="Height (cm)"
            name="height"
            type="number"
            min={100}
            max={250}
          />
          <FormFieldBmr
            label="Weight (kg)"
            name="weight"
            type="number"
            min={30}
            max={300}
          />
          <div className="py-4">
            <label
              className="text-LightTextCol dark:text-DarkTextCol"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="text-LightTextCol dark:text-DarkTextCol pt-4 ">
              <select
                {...methods.register("gender", {
                  required: "Please select a gender",
                })}
                className="p-2 border border-gray-300 dark:border-DarkUiCol rounded-md max-w-[340px] sm:max-w-[700px]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="py-4 max-w-96">
            <label
              className="max-w-96 text-LightTextCol dark:text-DarkTextCol"
              htmlFor="exerciseFrequency"
            >
              How often do you exercise?
            </label>
            <div className="text-LightTextCol dark:text-DarkTextCol pt-4 max-w-96">
              <select
                {...methods.register("exerciseFrequency", {
                  required: "Please select an exercise frequency",
                })}
                className="p-2 border border-gray-300 dark:border-DarkUiCol rounded-md max-w-[340px] sm:max-w-96"
              >
                <option value="Sedentary">
                  Sedentary: little or no exercise
                </option>
                <option value="Lightly Active">
                  Lightly Active (light exercise or sports 1-3 days a week)
                </option>
                <option value="Moderately Active">
                  Moderately Active (moderate exercise or sports 3-5 days a
                  week)
                </option>
                <option value="Very Active">
                  Very Active (hard exercise or sports 6-7 days a week)
                </option>
                <option value="Extra Active">
                  Extra Active (very hard exercise, a physical job, or training
                  twice a day)
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center px-6 py-5 h-8 my-5 text-md rounded-md text-white bg-green-700 hover:bg-green-600 cursor-pointer"
          >
            Calculate
          </button>
        </form>

        {tdee && (
          <div
            className="flex flex-col items-center justify-center mt-10"
            ref={deficitInfo ? resultsRef : null}
          >
            <p className="font-bold">Daily calorie expenditure: {tdee} cal</p>
            {deficitInfo && (
              <div className="flex flex-col items-center justify-center pl-6 ">
                <p className="py-4">
                  Eat {deficitInfo.deficit10.newDailyCaloricIntake.toFixed(0)}{" "}
                  calories per day to lose{" "}
                  {deficitInfo.deficit10.weeklyWeightLoss.toFixed(2)} kg per
                  week (10% deficit)
                </p>
                <p className="pb-4">
                  Eat {deficitInfo.deficit20.newDailyCaloricIntake.toFixed(0)}{" "}
                  calories per day to lose{" "}
                  {deficitInfo.deficit20.weeklyWeightLoss.toFixed(2)} kg per
                  week (20% deficit)
                </p>
                <p className="pb-12">
                  Eat {deficitInfo.deficit30.newDailyCaloricIntake.toFixed(0)}{" "}
                  calories per day to lose{" "}
                  {deficitInfo.deficit30.weeklyWeightLoss.toFixed(2)} kg per
                  week (30% deficit)
                </p>
              </div>
            )}
          </div>
        )}
      </FormProvider>
    </div>
  );
};

export default BmrCalculator;
