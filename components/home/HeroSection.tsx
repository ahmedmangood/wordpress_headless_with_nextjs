import { Container, Section } from "../craft";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("HomePage");
  const t2 = useTranslations("NavLinks");

  return (
    <section
      className={`h-screen bg-[url("/hero.webp")] bg-center bg-cover bg-no-repeat`}
    >
      <Container className="h-full">
        <div className="h-full flex flex-col items-start justify-center">
          <h1>{t("hero-title")}</h1>
          <p>{t("hero-paragraph")}</p>
          <Button asChild className="text-white">
            <Link
              href="/contact"
              className="text-white"
              style={{ color: "white" }}
            >
              {t2("quote")}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
