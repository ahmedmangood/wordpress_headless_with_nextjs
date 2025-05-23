"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@radix-ui/react-toggle";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Toggle className="flex justify-center items-center content-center p-2 border-2 rounded hover:bg-gray-100 dark:hover:bg-transparent transition-all">
      <Sun
        onClick={() => setTheme("dark")}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        onClick={() => setTheme("light")}
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      {/* <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">


          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger> */}
    </Toggle>
  );
}
