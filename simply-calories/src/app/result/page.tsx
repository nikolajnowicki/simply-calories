"use client";

import React from "react";
import Image from "next/image";
import { useSearchResults } from "../../components/shared/SearchProvider";
import { ParsedFood } from "../../models/ApiResponse";

const ResultPage = () => {
  const { results } = useSearchResults();

  if (!results || !results.parsed) {
    return (
      <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
          <p>No data found or data is in an unexpected format.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <div className="flex justify-center ">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
