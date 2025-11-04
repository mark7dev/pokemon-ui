'use client';

import { Grid } from '../components/Grid';
import { useTypeFilter } from '@/contexts/TypeFilterContext';

export default function Home() {
  const { selectedTypes, searchTerm } = useTypeFilter();

  return (
    <div className="theme-bg theme-text theme-transition">
      <Grid selectedTypes={selectedTypes} searchTerm={searchTerm} />
    </div>
  );
}
