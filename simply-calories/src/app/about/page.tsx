"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUserData } from "../actions/users/fetchUserData";
import { User } from "../../models/User";

export default function About() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session && session.user && session.user.email) {
      fetchUserData(session.user.email).then((data: User) => setUser(data));
    }
  }, [session]);

  const latestBMRResult = user
    ? user.bmrResults.reduce((latest, bmr) => {
        return latest.createdAt > bmr.createdAt ? latest : bmr;
      }, user.bmrResults[0])
    : null;

  return (
    <>
      <h1>About Page</h1>
      {latestBMRResult && (
        <div>
          <h2>Latest BMR Result</h2>
          <p>Height: {latestBMRResult.height} cm</p>
          <p>Weight: {latestBMRResult.weight} kg</p>
          <p>You can eat {latestBMRResult.tdee.toFixed(0)} calories a day.</p>
          <p>
            Eat {latestBMRResult.calculatedValueCalories10.toFixed(0)} calories
            per day to lose {latestBMRResult.calculatedValueKilos10.toFixed(2)}{" "}
            kg per week (10% deficit).
          </p>
          <p>
            Eat {latestBMRResult.calculatedValueCalories20.toFixed(0)} calories
            per day to lose {latestBMRResult.calculatedValueKilos20.toFixed(2)}{" "}
            kg per week (20% deficit).
          </p>
          <p>
            Eat {latestBMRResult.calculatedValueCalories30.toFixed(0)} calories
            per day to lose {latestBMRResult.calculatedValueKilos30.toFixed(2)}{" "}
            kg per week (30% deficit).
          </p>
        </div>
      )}
    </>
  );
}
