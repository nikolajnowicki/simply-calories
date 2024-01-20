"use client";

import React from "react";
import { useUserData } from "../../hooks/useUserData";

export default function Profile() {
  const user = useUserData();

  return (
    <>
      <h1>Profile Page</h1>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </>
  );
}
