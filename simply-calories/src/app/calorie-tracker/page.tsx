"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchCalorieData } from "../actions/users/fetchCalorieData";
import { User, foodConsumption } from "../../models/User";

export default function CalorieTracker() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [todaysFood, setTodaysFood] = useState<foodConsumption[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  useEffect(() => {
    if (session && session.user && session.user.email) {
      fetchCalorieData(session.user.email).then((data: User) => {
        console.log("User Data:", data);
        setUser(data);
        if (data && data.foodConsumption) {
          const today = new Date();
          const todaysData = data.foodConsumption.filter((consumption) => {
            const consumptionDate = new Date(consumption.dateConsumed);
            return (
              consumptionDate.getDate() === today.getDate() &&
              consumptionDate.getMonth() === today.getMonth() &&
              consumptionDate.getFullYear() === today.getFullYear()
            );
          });
          setTodaysFood(todaysData);
          const total = todaysData.reduce(
            (acc, curr) => acc + curr.calories,
            0
          );
          setTotalCalories(Math.ceil(total));
        }
      });
    }
  }, [session]);

  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <h1 className="text-xl font-bold  pt-12 pb-4">
          Today&apos;s Food Consumption
        </h1>

        {todaysFood.length > 0 ? (
          <div className="flex flex-col gap-2">
            {todaysFood.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-1"
              >
                <span className="flex-1">{item.foodName}</span>
                <span className="w-20 text-right">{item.amount}g</span>
                <span className="w-20 text-right">
                  {Math.ceil(item.calories)}cal
                </span>
              </div>
            ))}
            <div className="font-semibold py-12 text-center">
              Total Calories: {totalCalories}
            </div>
          </div>
        ) : (
          <p>No food consumption data for today.</p>
        )}
      </div>
    </div>
  );
}
