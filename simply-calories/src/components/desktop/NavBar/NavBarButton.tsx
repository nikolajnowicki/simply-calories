import Link from "next/link";

type NavBarButtonProps = {
  text: string;
  href: string;
};

export const NavBarButton = ({ text, href }: NavBarButtonProps) => {
  return (
    <li className="list-none">
      <Link href={href} passHref>
        <div className="flex justify-center items-center px-4 py-1 mx-1 h-16 text-md bg-transparent dark:hover:text-DarkTextCol2 cursor-pointer dark:focus:text-DarkTextCol2">
          {text}
        </div>
      </Link>
    </li>
  );
};
