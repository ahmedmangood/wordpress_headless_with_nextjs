import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";

const NavLinks = () => {
  const t = useTranslations("NavLinks");

  return (
    <div className="mx-2 hidden md:flex">
      <Button asChild variant="ghost" size="sm">
        <Link href={"/"}>{t("home")}</Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href={"/about"}>{t("about")}</Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href={"/services"}>{t("services")}</Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href={"/contact"}>{t("contact")}</Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href={"/posts"}>{t("blog")}</Link>
      </Button>
    </div>
  );
};

export default NavLinks;
