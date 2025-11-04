"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { TypeFilter } from "./TypeFilter";
import { SearchBar } from "./SearchBar";
import { useTypeFilter } from "@/contexts/TypeFilterContext";
import { Button, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import { MdSort } from "react-icons/md";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === '/';
    const { selectedTypes, setSelectedTypes, pokemonCount, isLoading, sortOrder, setSortOrder } = useTypeFilter();

    const handleReset = () => {
        setSelectedTypes([]);
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    const handleBackClick = () => {
        router.push('/');
    };

    const handleSortClick = () => {
        if (sortOrder === null) {
            setSortOrder('asc');
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else {
            setSortOrder(null);
        }
    };

    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'background.paper',
                backdropFilter: 'blur(10px)',
                borderBottom: 1,
                borderColor: 'divider',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                width: '100%',
                px: { xs: 1, sm: 2, md: 4 },
                py: { xs: 1, sm: 1.5, md: 2 }
            }}
        >
            {/* Mobile Layout: Stacked */}
            <Box
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: 'column',
                    gap: 1
                }}
            >
                {/* Mobile: Top row - Logo and Theme Toggle */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {!isHomePage && (
                            <IconButton
                                onClick={handleBackClick}
                                size="small"
                                sx={{
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'action.hover'
                                    }
                                }}
                                aria-label="Go back"
                            >
                                <IoArrowBack size={20} />
                            </IconButton>
                        )}
                        <Box
                            onClick={handleLogoClick}
                            sx={{
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Pokemon Logo"
                                width={120}
                                height={90}
                                priority
                                className="h-auto"
                                style={{ maxWidth: '120px', height: 'auto' }}
                            />
                        </Box>
                    </Box>
                    <ThemeToggle />
                </Box>

                {/* Mobile: Middle row - Search Bar */}
                {isHomePage && (
                    <Box sx={{ width: '100%', display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ flex: 1 }}>
                            <SearchBar />
                        </Box>
                        <Tooltip title={sortOrder === 'asc' ? 'Sort A-Z' : sortOrder === 'desc' ? 'Sort Z-A' : 'Sort by Name'}>
                            <IconButton
                                onClick={handleSortClick}
                                size="small"
                                sx={{
                                    color: sortOrder ? 'primary.main' : 'text.secondary',
                                    border: 1,
                                    borderColor: sortOrder ? 'primary.main' : 'divider',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                        borderColor: 'primary.main'
                                    }
                                }}
                                aria-label="Sort by name"
                            >
                                <MdSort size={20} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}

                {/* Mobile: Bottom row - Filter, Button, Total */}
                {isHomePage && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', width: '100%' }}>
                        <Box sx={{ flex: 1, minWidth: '150px' }}>
                            <TypeFilter 
                                selectedTypes={selectedTypes} 
                                onTypesChange={setSelectedTypes} 
                            />
                        </Box>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleReset}
                            disabled={selectedTypes.length === 0}
                            sx={{
                                textTransform: 'none',
                                minWidth: { xs: '80px', sm: '100px' },
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                        >
                            Remove All
                        </Button>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                whiteSpace: 'nowrap',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                        >
                            Total: {isLoading ? 'Counting...' : pokemonCount}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Desktop Layout: 3 columns */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                {isHomePage ? (
                    <>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
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
                                Total: {isLoading ? 'Counting...' : pokemonCount}
                            </Typography>
                        </Box>

                        <Box 
                            sx={{ 
                                flex: 1, 
                                display: 'flex', 
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                            onClick={handleLogoClick}
                        >
                            <Image
                                src="/logo.png"
                                alt="Pokemon Logo"
                                width={180}
                                height={135}
                                priority
                                className="h-auto"
                                style={{ maxWidth: '180px', height: 'auto' }}
                            />
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                            <SearchBar />
                            {isHomePage && (
                                <Tooltip title={sortOrder === 'asc' ? 'Sort A-Z' : sortOrder === 'desc' ? 'Sort Z-A' : 'Sort by Name'}>
                                    <IconButton
                                        onClick={handleSortClick}
                                        size="small"
                                        sx={{
                                            color: sortOrder ? 'primary.main' : 'text.secondary',
                                            border: 1,
                                            borderColor: sortOrder ? 'primary.main' : 'divider',
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                                borderColor: 'primary.main'
                                            }
                                        }}
                                        aria-label="Sort by name"
                                    >
                                        <MdSort size={20} />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <ThemeToggle />
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <IconButton
                                onClick={handleBackClick}
                                size="small"
                                sx={{
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'action.hover'
                                    }
                                }}
                                aria-label="Go back"
                            >
                                <IoArrowBack size={22} />
                            </IconButton>
                        </Box>
                        <Box 
                            sx={{ 
                                flex: 1, 
                                display: 'flex', 
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                            onClick={handleLogoClick}
                        >
                <Image
                    src="/logo.png"
                    alt="Pokemon Logo"
                    width={320}
                    height={240}
                    priority
                    className="h-auto"
                                style={{ maxWidth: '320px', height: 'auto' }}
                />
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ThemeToggle />
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}