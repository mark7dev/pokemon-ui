"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { TypeFilter } from "./TypeFilter";
import { useTypeFilter } from "@/contexts/TypeFilterContext";

export const Header = () => {
    const { selectedTypes, setSelectedTypes } = useTypeFilter();

    return (
        <header className="w-full p-4 flex justify-between items-center pt-6 pb-6">
            <div className="flex-1 flex justify-start">
                <TypeFilter 
                    selectedTypes={selectedTypes} 
                    onTypesChange={setSelectedTypes} 
                />
            </div>
            <div className="flex-1 flex justify-center">
                <Image
                    src="/logo.png"
                    alt="Pokemon Logo"
                    width={320}
                    height={240}
                    priority
                    className="h-auto"
                />
            </div>
            <div className="flex-1 flex justify-end">
                <ThemeToggle />
            </div>
        </header>
    )
}