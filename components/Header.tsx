"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { TypeFilter } from "./TypeFilter";
import { useTypeFilter } from "@/contexts/TypeFilterContext";
import { Button, Typography } from "@mui/material";
import { usePokemon } from "@/hooks/usePokemon";

export const Header = () => {
    const { selectedTypes, setSelectedTypes } = useTypeFilter();
    const { pokemon, loading } = usePokemon(selectedTypes);

    const handleReset = () => {
        setSelectedTypes([]);
    };

    const pokemonCount = loading ? 0 : pokemon.length;

    return (
        <header className="w-full p-4 flex justify-between items-center pt-6 pb-6">
            <div className="flex-1 flex justify-start items-center gap-2">
                <TypeFilter 
                    selectedTypes={selectedTypes} 
                    onTypesChange={setSelectedTypes} 
                />
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleReset}
                    disabled={selectedTypes.length === 0}
                    sx={{
                        textTransform: 'none',
                        minWidth: '100px'
                    }}
                >
                    Remove All
                </Button>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        ml: 1,
                        whiteSpace: 'nowrap'
                    }}
                >
                    Total: {pokemonCount}
                </Typography>
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