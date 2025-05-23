import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "../globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Main } from "@/components/craft";
import { mainMenu } from "@/menu.config";

import Logo from "@/public/logo.png";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import LocaleSwitcher from "@/components/localSwitcher/LocalSwitcher";
import { Footer } from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Triple Point For Trading",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL("https://triplepointsa.com"),
};

// Revalidate content every hour
export const revalidate = 3600;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Nav />
            <Main>{children}</Main>
            <Footer />
          </ThemeProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
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
          <h2 className="sr-only">next-wp starter</h2>
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
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="hidden sm:flex">
            <Link href="/quote">Get A Quote</Link>
          </Button>
          <LocaleSwitcher />
          <MobileNav />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
