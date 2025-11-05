'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
     
    setMounted(true);
  }, []);

  const theme = React.useMemo(() => {
    const isDark = mounted ? resolvedTheme === 'dark' : false;
    
    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        ...(isDark && {
          background: {
            default: '#0a0a0a',
            paper: '#0a0a0a',
          },
          text: {
            primary: '#ededed',
            secondary: 'rgba(237, 237, 237, 0.7)',
          },
        }),
        ...(!isDark && {
          background: {
            default: '#ffffff',
            paper: '#ffffff',
          },
          text: {
            primary: '#171717',
            secondary: 'rgba(23, 23, 23, 0.7)',
          },
        }),
        primary: {
          main: '#007BFF',
          dark: isDark ? '#0099FF' : '#004085',
          light: isDark ? '#003366' : '#CCE5FF',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
              color: isDark ? '#ededed' : '#171717',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
          },
        },
      },
    });
  }, [resolvedTheme, mounted]);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;