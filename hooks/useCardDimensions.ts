import { useRef, useEffect, useState } from 'react';

export interface CardDimensions {
  width: string;
  height: string;
  typesHeight: string;
  abilitiesHeight: string;
}

/**
 * Custom hook to measure card dimensions and sync heights
 */
export const useCardDimensions = (dependencies: unknown[] = []) => {
  const idCardRef = useRef<HTMLDivElement>(null);
  const weightCardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<CardDimensions>({
    width: 'auto',
    height: 'auto',
    typesHeight: 'auto',
    abilitiesHeight: 'auto',
  });

  useEffect(() => {
    const updateDimensions = () => {
      const newDimensions: CardDimensions = {
        width: 'auto',
        height: 'auto',
        typesHeight: 'auto',
        abilitiesHeight: 'auto',
      };

      // Get ID card height for Types
      if (idCardRef.current) {
        const cardElement = idCardRef.current.querySelector('.MuiCard-root') as HTMLElement;
        if (cardElement) {
          newDimensions.typesHeight = `${cardElement.offsetHeight}px`;
        } else {
          newDimensions.typesHeight = `${idCardRef.current.offsetHeight}px`;
        }
      }

      // Get Weight card dimensions for Abilities and all basic stats cards
      if (weightCardRef.current) {
        const cardElement = weightCardRef.current.querySelector('.MuiCard-root') as HTMLElement;
        if (cardElement) {
          newDimensions.abilitiesHeight = `${cardElement.offsetHeight}px`;
          newDimensions.width = `${weightCardRef.current.offsetWidth}px`;
          newDimensions.height = `${cardElement.offsetHeight}px`;
        } else {
          newDimensions.abilitiesHeight = `${weightCardRef.current.offsetHeight}px`;
          newDimensions.width = `${weightCardRef.current.offsetWidth}px`;
          newDimensions.height = `${weightCardRef.current.offsetHeight}px`;
        }
      }

      setDimensions(newDimensions);
    };

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      updateDimensions();
    }, 100);

    // Update on window resize
    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, dependencies);

  return {
    idCardRef,
    weightCardRef,
    dimensions,
  };
};

