'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { ThemeProvider } from "next-themes";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import { TypeFilterProvider } from "@/contexts/TypeFilterContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
          disableTransitionOnChange={false}
          enableColorScheme={true}
          storageKey="pokemon-theme"
        >
          <MuiThemeProvider>
            <TypeFilterProvider>
              <Header />
              {children}
            </TypeFilterProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
