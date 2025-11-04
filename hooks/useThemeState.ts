"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Custom hook to get the current theme state globally
 * Returns isDark boolean and other theme utilities
 * Can be used in any component for conditional rendering
 */
export const useThemeState = () => {
    const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate if current theme is dark
    const isDark = mounted ? resolvedTheme === "dark" : false;
    const isLight = mounted ? resolvedTheme === "light" : true;
    
    // Helper functions for theme switching
    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    const setDarkTheme = () => setTheme('dark');
    const setLightTheme = () => setTheme('light');
    const setSystemTheme = () => setTheme('system');

    return {
        // Main state flags
        isDark,
        isLight,
        mounted,
        
        // Theme values
        theme,
        resolvedTheme,
        systemTheme,
        
        // Theme actions
        setTheme,
        toggleTheme,
        setDarkTheme,
        setLightTheme,
        setSystemTheme,
    };
};