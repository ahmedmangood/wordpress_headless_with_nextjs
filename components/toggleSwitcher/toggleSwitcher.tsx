"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  defaultValue: string;
  label: string;
  languages: {
    [key: string]: string; // language code to display name
  };
};

export default function LocaleSwitcherToggle({
  defaultValue,
  label,
  languages,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function toggleLocale() {
    const currentLocale = defaultValue;
    const availableLocales = Object.keys(languages);
    const nextLocale = availableLocales.find(
      (locale) => locale !== currentLocale
    ) as Locale;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <button
      type="button"
      className={clsx(
        "relative flex items-center justify-center gap-2 px-4 py-2 rounded-md",
        "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-colors duration-200",
        isPending && "opacity-70 cursor-not-allowed"
      )}
      disabled={isPending}
      onClick={toggleLocale}
      aria-label={label}
    >
      <span className="uppercase">{label}</span>
    </button>
  );
}
