import Link from "next/link";

type NavBarButtonProps = {
  text: string;
  href: string;
};

export const NavBarButton = (props: NavBarButtonProps) => {
  return (
    <Link href={props.href}>
      <button className="px-4 py-1 mx-1 bg-transparent dark:bg-gray-700">
        {props.text}
      </button>
    </Link>
  );
};
