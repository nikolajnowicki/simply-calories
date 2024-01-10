import Image from "next/image";
import { Coiny } from "next/font/google";

const coiny = Coiny({ subsets: ["latin"], weight: "400", display: "swap" });

export const DesktopLogo = () => {
  return (
    <div className="flex w-full justify-center items-center py-4">
      <Image src="/flameLogo.svg" alt="Logo" width={70} height={70} priority />

      <p
        className={`${coiny.className} pt-5 text-4xl text-LightTextCol/90 dark:text-DarkTextCol/90`}
      >
        Simply Calories
      </p>
    </div>
  );
};
