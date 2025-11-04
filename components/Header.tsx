"use client";

import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
    return (
        <header className="w-full p-4 flex justify-end">
            <ThemeToggle />
        </header>
    )
}