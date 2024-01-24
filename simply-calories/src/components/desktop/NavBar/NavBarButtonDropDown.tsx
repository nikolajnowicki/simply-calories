"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

type NavBarButtonDropdownProps = {
  text: string;
  dropdownItems: { text: string; href: string }[];
};

export const NavBarButtonDropdown = ({
  text,
  dropdownItems,
}: NavBarButtonDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(true);
      }
    };

    const handleBlur = (event: FocusEvent) => {
      setTimeout(() => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(document.activeElement)
        ) {
          setIsOpen(false);
        }
      }, 0);
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  return (
    <div
      className="relative inline-block z-10"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="px-4 py-1 mx-1 h-16 bg-transparent text-LightTextCol hover:text-cyan-700 dark:text-DarkTextCol dark:hover:text-DarkTextCol2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {text}
      </button>
      {isOpen && (
        <ul
          className={`absolute left-0 top-full translate-y-px text-LightTextCol shadow-lg dark:text-DarkTextCol `}
        >
          {dropdownItems.map((item, index) => (
            <li
              key={index}
              className={`bg-LightUiCol dark:bg-DarkUiCol ${
                index < dropdownItems.length - 1
                  ? "border-b border-gray-400"
                  : ""
              }`}
            >
              <Link href={item.href} passHref>
                <div className="block px-4 py-2 text-Light hover:text-cyan-700 dark:hover:text-DarkTextCol2 dark:focus:text-DarkTextCol2  cursor-pointer whitespace-nowrap w-auto min-w-[150px]">
                  {item.text}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
