'use client';

import { Box, Typography, LinearProgress } from '@mui/material';
import type { PokemonStats } from '@/types/pokemon';

interface StatsChartProps {
  stats: PokemonStats;
}

const STAT_COLORS: Record<string, string> = {
  'hp': '#4caf50',
  'attack': '#f44336',
  'defense': '#2196f3',
  'special_attack': '#ff9800',
  'special_defense': '#9c27b0',
  'speed': '#00bcd4',
};

const STAT_LABELS: Record<string, string> = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special_attack': 'Sp. Attack',
  'special_defense': 'Sp. Defense',
  'speed': 'Speed',
};

const STAT_ORDER = ['hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed'] as const;

export const StatsChart = ({ stats }: StatsChartProps) => {
  if (!stats) {
    return (
      <Typography variant="body2" color="text.secondary">
        No stats available
      </Typography>
    );
  }

  // Convert stats object to array and find max value for normalization
  const statsArray = STAT_ORDER.map(key => ({
    name: key,
    value: stats[key]
  }));

  const maxStat = Math.max(...statsArray.map(stat => stat.value), 255);

  return (
    <Box sx={{ width: '100%' }}>
      {statsArray.map((stat) => {
        const normalizedValue = Math.min((stat.value / maxStat) * 100, 100);
        const color = STAT_COLORS[stat.name] || '#757575';
        const label = STAT_LABELS[stat.name] || stat.name;

        return (
          <Box key={stat.name} sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
              {label}
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  height: 24,
                  width: `${normalizedValue}%`,
                  backgroundColor: color,
                  borderRadius: 2,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  minWidth: 40,
                  textAlign: 'left',
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

