"use client"

import { useEffect } from "react";
import { GoMoon } from "react-icons/go";
import { GoSun } from "react-icons/go";
import { useThemeState } from "@/hooks/useThemeState";

export const ThemeToggle = () => {
    const { isDark, mounted, toggleTheme, setTheme } = useThemeState();

    // Always listen for system theme changes and sync the toggle
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            // When system changes, update the toggle to match system preference
            const newSystemTheme = e.matches ? 'dark' : 'light';
            
            // Always sync with system changes
            setTheme(newSystemTheme);
        };

        // Add the event listener
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        
        // Cleanup listener on unmount
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []); // No dependencies - always listen

    if (!mounted) {
        return (
            <div className="w-12 h-6 bg-gray-300 rounded-full animate-pulse">
                <div className="w-5 h-5 bg-white rounded-full m-0.5"></div>
            </div>
        );
    }

    // Simple toggle: if dark, switch to light; if light, switch to dark
    const handleToggle = () => {
        toggleTheme();
    };

    return (
        <button
            onClick={handleToggle}
            className={`
                relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out
                ${isDark ? 'bg-brand-blue' : 'bg-gray-300'}
                focus:outline-none
            `}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Currently ${isDark ? 'dark' : 'light'} mode. Click to switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span
                className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                    transition-transform duration-300 ease-in-out
                    ${isDark ? 'translate-x-6' : 'translate-x-0'}
                    flex items-center justify-center text-xs text-gray-700
                `}
            >
                {isDark ? <GoMoon className="text-gray-700" /> : <GoSun className="text-gray-700" />}
            </span>
        </button>
    );
};