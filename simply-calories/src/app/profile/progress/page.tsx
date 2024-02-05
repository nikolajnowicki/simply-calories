"use client";

import React from "react";
import { useUserData } from "../../../hooks/useUserData";

export default function Profile() {
  const user = useUserData();

  return (
    <>
      <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
          <h1 className="text-xl font-bold  pt-12 pb-4">Profile Page</h1>
          {user && (
            <>
              <p>
                Username:{" "}
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </p>
              <p>Email: {user.email}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
