"use client";
import React, { useState, useEffect } from "react";
import { useUserData } from "../../hooks/useUserData";
import Spinner from "@/components/shared/Spinner";

export default function Profile() {
  const userInfo = useUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo]);

  const getLatestBMRResult = () => {
    return userInfo && userInfo.bmrResults && userInfo.bmrResults.length > 0
      ? userInfo.bmrResults.reduce((latest, bmr) => {
          return latest.createdAt > bmr.createdAt ? latest : bmr;
        }, userInfo.bmrResults[0])
      : null;
  };

  const latestBMRResult = getLatestBMRResult();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
          <h1 className="text-xl font-bold  pt-12 pb-8">Profile Page</h1>
          {userInfo && (
            <div className="flex flex-col justify-center items-center ">
              <div className="flex flex-col justify-center items-center min-w-60">
                <div className="flex py-2 w-60 ">
                  <p className="pr-2 font-semibold ">Username:</p>
                  <p className="">
                    {userInfo.username.charAt(0).toUpperCase() +
                      userInfo.username.slice(1)}
                  </p>
                </div>
                <div className="flex py-2 w-60">
                  <p className="pr-2 font-semibold ">Email:</p>
                  <p className="">{userInfo.email}</p>
                </div>
              </div>

              <div className="flex ">
                {latestBMRResult && (
                  <div>
                    <h2 className="pt-8 pb-4 font-bold text-lg text-center">
                      Latest BMR Result
                    </h2>
                    <div className="flex py-2">
                      <p className="pr-2 font-semibold">Height:</p>
                      <p>{latestBMRResult.height}cm</p>
                    </div>

                    <div className="flex py-2">
                      <p className="pr-2 font-semibold">Weight:</p>
                      <p className="">{latestBMRResult.weight}kg</p>
                    </div>

                    <p className="font-semibold pt-8">
                      You can eat {latestBMRResult.tdee.toFixed(0)} calories a
                      day.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
