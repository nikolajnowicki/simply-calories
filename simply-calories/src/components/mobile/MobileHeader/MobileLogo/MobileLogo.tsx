import Image from "next/image";
import { Coiny } from "next/font/google";

const coiny = Coiny({ subsets: ["latin"], weight: "400", display: "swap" });

export const MobileLogo = () => {
  return (
    <div className="flex  w-full">
      <Image src="/flameLogo.svg" alt="Logo" width={50} height={50} priority />

      <p className={`${coiny.className} pt-6 text-2xl`}>Simply Calories</p>
    </div>
  );
};
