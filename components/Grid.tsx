'use client';

import { PokemonCard } from './Card';
import { usePokemon } from '@/hooks/usePokemon';
import { Alert, Typography, Box } from '@mui/material';
import { SimpleLoading } from './SimpleLoading';

interface GridProps {
    selectedTypes: string[];
    searchTerm: string;
    sortOrder: 'asc' | 'desc' | null;
}

export const Grid = ({ selectedTypes, searchTerm, sortOrder }: GridProps) => {
    const { pokemon, loading, error } = usePokemon(selectedTypes, searchTerm, sortOrder);

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">
                    Error loading Pokemon: {error}
                </Alert>
            </Box>
        );
    }

    if (loading) {
        return <SimpleLoading />;
    }

    if (pokemon.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No Pokemon found
                </Typography>
            </Box>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {pokemon.map((poke) => (
                <PokemonCard key={poke.name} pokemon={poke} />
            ))}
        </div>
    );
}