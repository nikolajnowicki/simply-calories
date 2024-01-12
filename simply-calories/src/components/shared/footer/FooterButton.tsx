import Link from "next/link";

type FooterButtonProps = {
  text: string;
  href: string;
};

export const FooterButton = ({ text, href }: FooterButtonProps) => {
  return (
    <li className="list-none">
      <Link href={href} passHref>
        <div className=" relative flex justify-center items-center  lg:px-4 lg:py-1 mx-1 h-16 text-md hover:text-cyan-700 text-LightTextCol bg-transparent dark:text-white dark:text-opacity-87 dark:hover:text-DarkTextCol2 cursor-pointer dark:focus:text-DarkTextCol2">
          {text}
        </div>
      </Link>
    </li>
  );
};
