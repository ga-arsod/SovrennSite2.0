import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import Navbar from "@/components/Home/Navbar";
import { Providers } from "./Redux/provider";

const inter = Inter({
  weight: ['200'],
  style: ['normal'],
  subsets: ['latin'], });

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
    <html lang="en">
      <Navbar/>
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
    </ThemeProvider>
  );
};