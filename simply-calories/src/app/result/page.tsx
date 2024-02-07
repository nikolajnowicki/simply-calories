"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchResults } from "../../components/shared/SearchProvider";
import { ParsedFood } from "../../models/ApiResponse";
import { useModal } from "../../hooks/useModal";
import AddFoodModal from "../../components/shared/modals/AddFood/AddFoodModal";
import { saveFoodConsumptionData } from "../../app/actions/users/saveFoodConsumptionData";

const ResultPage = () => {
  const { results } = useSearchResults();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedFood, setSelectedFood] = useState<ParsedFood | null>(null);
  const [calculationMessage, setCalculationMessage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    setCalculationMessage("");
  }, [selectedFood?.food.nutrients, results?.parsed]);

  const handleOpenModal = (foodItem: ParsedFood) => {
    setSelectedFood(foodItem);
    openModal();
  };

  const handleCalculateOrSave = async (amount: number) => {
    if (!selectedFood || !selectedFood.food.nutrients) {
      console.error("Selected food is null or missing nutrient data");
      return;
    }

    const { ENERC_KCAL } = selectedFood.food.nutrients;
    const calories = Math.round(amount * (ENERC_KCAL / 100));

    const message = `<p>${amount}g of ${selectedFood.food.label}</p><p>contains ${calories} cal</p>`;
    setCalculationMessage(message);

    if (session?.user?.email) {
      try {
        const dateConsumed = new Date();
        await saveFoodConsumptionData({
          email: session.user.email,
          foodName: selectedFood.food.label,
          amount,
          calories,
          dateConsumed,
        });
      } catch (error) {
        console.error("Error saving food consumption data:", error);
      }
    }

    closeModal();
  };

  if (!results || !results.parsed) {
    return <div>No data found or data is in an unexpected format.</div>;
  }

  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <AddFoodModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleCalculateOrSave}
      />
      <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        {results.parsed.map((item: ParsedFood, index: number) => (
          <div key={index} className="p-4">
            <h2 className="text-xl font-bold text-center pt-12 pb-2">
              {item.food.label}
            </h2>
            {item.food.image && (
              <Image
                src={item.food.image}
                alt={item.food.label}
                width={150}
                height={150}
                className="rounded-md py-2"
              />
            )}
            <div className="text-sm mt-2">
              <p>Calories: {item.food.nutrients.ENERC_KCAL}</p>
              <p>Protein: {item.food.nutrients.PROCNT}g</p>
              <p>Fat: {item.food.nutrients.FAT}g</p>
              <p>Carbs: {item.food.nutrients.CHOCDF}g</p>
              <p>Fiber: {item.food.nutrients.FIBTG}g</p>
              <button
                onClick={() => handleOpenModal(item)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {session ? "Add" : "Calculate"}
              </button>
            </div>
          </div>
        ))}

        {calculationMessage && (
          <div
            className="mt-4 text-md text-center font-semibold "
            dangerouslySetInnerHTML={{ __html: calculationMessage }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
