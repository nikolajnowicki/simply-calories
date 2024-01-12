import Link from "next/link";
import { FooterButton } from "./FooterButton";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className=" md:h-14 w-full sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
      <div className="shadow-lg h-full w-full rounded-b-xl md:pb-4 md:mb-4 bg-LightUiCol dark:bg-DarkUiCol">
        <nav className="flex flex-col justify-center md:grid md:grid-cols-3 md:items-center">
          <ul className="flex lg:justify-start space-x-4 pl-4 order-2 md:order-1 justify-center">
            <FooterButton text="Contact" href="/contact" />
            <FooterButton text="About" href="/about" />
            <FooterButton text="Privacy Policy" href="/privacy" />
          </ul>

          <span className="text-sm text-center pt-2 order-1 md:order-2">
            ©2024 Simply Calories
          </span>

          <div className="hidden md:flex justify-end space-x-4 pr-4 order-3 ">
            <div className="hover:text-LightPrimaryCol dark:hover:text-DarkTextCol2">
              <Link
                href="https://www.linkedin.com/in/nikolaj-nowicki-0a293a252/"
                passHref
              >
                <FaLinkedin
                  size="1.5em"
                  href="https://www.linkedin.com/in/nikolaj-nowicki-0a293a252/"
                />
              </Link>
            </div>
            <div className="hover:text-LightPrimaryCol dark:hover:text-DarkTextCol2">
              <Link href="https://github.com/nikolajnowicki" passHref>
                <FaGithub size="1.5em" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};
