"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import Spinner from "@/components/shared/Spinner";
import CalorieGoalModal from "@/components/shared/modals/CalorieGoal/CalorieGoalModal";
import { fetchCalorieData } from "../../actions/users/fetchCalorieData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FoodConsumption {
  dateConsumed: string;
  calories: number;
}

interface User {
  foodConsumption: FoodConsumption[];
  caloricGoal?: number;
}

export default function CaloricProgress() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCaloricGoal, setCurrentCaloricGoal] = useState<number | null>(
    null
  );
  const [aggregatedData, setAggregatedData] = useState<{
    [date: string]: number;
  }>({});
  const [weeklyTotal, setWeeklyTotal] = useState<number>(0);
  const [weeklyAverage, setWeeklyAverage] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fetchCalorieData(session.user.email).then((data: User) => {
        if (data?.foodConsumption) {
          const sixDaysAgo = new Date();
          sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

          const recentConsumption = data.foodConsumption.filter(
            (entry: FoodConsumption) => {
              const entryDate = new Date(entry.dateConsumed);
              return entryDate >= sixDaysAgo;
            }
          );

          const aggregation = recentConsumption.reduce<{
            [date: string]: number;
          }>((acc, curr) => {
            const date = new Date(curr.dateConsumed).toLocaleDateString(
              "en-US",
              {
                month: "2-digit",
                day: "2-digit",
              }
            );
            acc[date] = (acc[date] || 0) + curr.calories;
            return acc;
          }, {});

          setAggregatedData(aggregation);

          const totalCalories = Object.values(aggregation).reduce(
            (sum, current) => sum + current,
            0
          );
          const daysWithData = Object.keys(aggregation).length;
          setWeeklyTotal(totalCalories);
          setWeeklyAverage(daysWithData > 0 ? totalCalories / daysWithData : 0);

          setCurrentCaloricGoal(data.caloricGoal || null);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [session]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getAdjustedChartData = () => {
    const isSmallScreen = screenWidth < 768;
    const keys = Object.keys(aggregatedData);
    const values = Object.values(aggregatedData);

    if (isSmallScreen && keys.length > 5) {
      const lastFiveKeys = keys.slice(-5);
      const lastFiveValues = values.slice(-5);
      return {
        labels: lastFiveKeys,
        datasets: [
          {
            label: "Daily Caloric Intake",
            data: lastFiveValues,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            fill: false,
          },
          currentCaloricGoal
            ? {
                label: "Caloric Goal",
                data: lastFiveKeys.map(() => currentCaloricGoal),
                borderColor: "rgb(255, 99, 132)",
                borderDash: [5, 5],
                borderWidth: 2,
                fill: false,
              }
            : null,
        ].filter(Boolean) as ChartDataset<"line", number[]>[],
      };
    }

    return {
      labels: keys,
      datasets: [
        {
          label: "Daily Caloric Intake",
          data: values,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          fill: false,
        },
        currentCaloricGoal
          ? {
              label: "Caloric Goal",
              data: keys.map(() => currentCaloricGoal),
              borderColor: "rgb(255, 99, 132)",
              borderDash: [5, 5],
              borderWidth: 2,
              fill: false,
            }
          : null,
      ].filter(Boolean) as ChartDataset<"line", number[]>[],
    };
  };

  const chartData = getAdjustedChartData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <div className="w-full md:w-[600px] h-[400px]">
          <h1 className="text-center text-2xl font-bold pb-4 pt-8">
            Caloric Progress
          </h1>
          <Line data={chartData} options={options} />
        </div>
        <div className="flex flex-col text-center pt-20 pb-8">
          <p className=" text-LightTextCol font-semibold dark:text-DarkTextCol pt-8">
            Current Goal: {currentCaloricGoal ? currentCaloricGoal : "N/A"} cal
          </p>

          <p className="py-4 font-semibold">
            Weekly Average: {Math.round(weeklyAverage)} cal
          </p>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Goal
          </button>
          {isModalOpen && (
            <CalorieGoalModal isOpen={isModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
}
