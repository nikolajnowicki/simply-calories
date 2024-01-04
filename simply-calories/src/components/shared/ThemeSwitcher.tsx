"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="flex justify-center items-center w-6 h-6"></div>;
  }

  return (
    <button
      className="flex justify-center items-center w-6 h-6 cursor-pointer bg-transparent border-none p-0"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
    </button>
  );
}
