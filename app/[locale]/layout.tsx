import type { Metadata } from "next";
import { Inter as FontSans, Tajawal } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Main } from "@/components/craft";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/nav/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const tajwalFont = Tajawal({
  subsets: ["arabic"],
  variable: "--tajwal-font",
  weight: ["300", "500", "800"],
  display: "swap",
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
        className={cn(
          "min-h-screen antialiased",
          locale === "en" ? fontSans.className : tajwalFont.className
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Navbar />
            <Main>{children}</Main>
            <Footer />
          </ThemeProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
