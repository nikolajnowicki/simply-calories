import Link from "next/link";

type NavBarButtonProps = {
  text: string;
  href: string;
};

export const NavBarButton = (props: NavBarButtonProps) => {
  return (
    <Link href={props.href}>
      <button className="p-4 m-4 bg-white dark:bg-gray-700">
        {props.text}
      </button>
    </Link>
  );
};
