"use client";

import { usePathname, useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { useTypeFilter } from "@/contexts/TypeFilterContext";
import { HeaderMobile } from "./layout/HeaderMobile";
import { HeaderDesktop } from "./layout/HeaderDesktop";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === '/';
    const { sortOrder, setSortOrder } = useTypeFilter();

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
                <HeaderMobile 
                    isHomePage={isHomePage}
                    onLogoClick={handleLogoClick}
                    onBackClick={handleBackClick}
                    onSortClick={handleSortClick}
                />
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
                <HeaderDesktop 
                    isHomePage={isHomePage}
                    onLogoClick={handleLogoClick}
                    onBackClick={handleBackClick}
                    onSortClick={handleSortClick}
                />
            </Box>
        </Box>
    )
}