import Link from "next/link";

type RegisterButtonProps = {
  text: string;
  href: string;
};

export const RegisterButton = ({ text, href }: RegisterButtonProps) => {
  return (
    <li className="list-none">
      <Link href={href} passHref>
        <div className="flex justify-center items-center px-4 py-1 mr-4 h-8 text-md rounded-md text-white bg-slate-700 hover:bg-slate-600      cursor-pointer 2">
          {text}
        </div>
      </Link>
    </li>
  );
};
