import Image from "next/image";
import { Container, Section } from "../craft";
import { Button } from "../ui/button";
import Link from "next/link";

const imageProps = {
  src: "/hero.webp",
  width: 1000,
  height: 1000,
  layout: "responsive",
  alt: "Hero Image",
};

const HeroSection = () => {
  return (
    <section
      className={`h-screen bg-[url("/hero.webp")] bg-center bg-cover bg-no-repeat`}
    >
      <Container className="h-full">
        <div className="h-full flex flex-col items-start justify-center">
          <h1>Start your project journey with us</h1>
          <p>
            We offer comprehensive services in building design, finishing,
            low-current systems, and advanced technological solutions.
          </p>
          <Button asChild>
            <Link href="/contact">start now!</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
