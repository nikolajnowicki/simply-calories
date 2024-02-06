import React, { useState, useRef, useEffect } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

export const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  const userMenuItems = [
    { text: "Profile", href: "/profile" },
    { text: "Calories", href: "/profile/calories" },
  ];

  return (
    <div
      className="relative inline-block text-4xl font-bold text-LightTextCol dark:text-DarkTextCol/80 text-center"
      ref={dropdownRef}
    >
      <div className="flex pr-4">
        <button onClick={toggleDropdown}>
          <PiUserCircleLight />
        </button>
      </div>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-LightUiCol dark:bg-DarkUiCol shadow-lg rounded-md py-1 z-10">
          {userMenuItems.map((item, index) => (
            <li
              key={index}
              className="border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <Link href={item.href} passHref>
                <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  {item.text}
                </div>
              </Link>
            </li>
          ))}
          <li
            className=" border-gray-100 dark:border-gray-700"
            onClick={handleLogout}
          >
            <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              Logout
            </div>
          </li>
          <div className="flex justify-center items-center pl-4 mt-8 mb-4">
            <ThemeSwitcher />
          </div>
        </ul>
      )}
    </div>
  );
};

export default UserButton;
