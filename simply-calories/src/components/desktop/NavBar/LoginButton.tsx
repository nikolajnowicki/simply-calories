import Link from "next/link";

type LogInButtonProps = {
  text: string;
  href: string;
  className?: string;
};

export const LogInButton = ({ text, href }: LogInButtonProps) => {
  return (
    <li className="list-none">
      <Link href={href} passHref>
        <div className="flex justify-center items-center px-4 py-1 mr-4 h-8 text-md text-white rounded-md bg-green-700 hover:bg-green-600  cursor-pointer ">
          {text}
        </div>
      </Link>
    </li>
  );
};
