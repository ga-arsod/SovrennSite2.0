
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import Navbar from "@/components/Home/Navbar";
import { Providers } from "./Redux/provider";
import {auth} from "@/auth";



const inter = Inter({
  weight: ['200'],
  style: ['normal'],
  subsets: ['latin'],
 
 });

export default async function RootLayout({ children }) {

  const session =await auth();
 
  return (
    <ThemeProvider theme={theme}>
      <Providers>
    <html lang="en">
      <Navbar session={session}/>
      <body className={inter.className}>
        
        {children}
      
        </body>
    
    </html>
    </Providers>
    </ThemeProvider>
  );
};