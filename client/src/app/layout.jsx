"use client"
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider >
        <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
        </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
