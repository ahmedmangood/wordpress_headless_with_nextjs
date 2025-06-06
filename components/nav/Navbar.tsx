import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu } from "@/menu.config";

import Logo from "@/public/logo.png";

import Image from "next/image";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "@/components/localSwitcher/LocalSwitcher";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import NavLinks from "./navLinks";

const Navbar = ({ className, children, id }: NavProps) => {
  const t = useTranslations("NavLinks");

  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">New starter template</h2>
          <Image
            src={Logo}
            alt="Logo"
            className="dark:invert"
            width={84}
            height={30.54}
          ></Image>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <NavLinks />
          <Button asChild className="hidden sm:flex">
            <Link href="/quote">{t("quote")}</Link>
          </Button>
          <MobileNav />
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
