"use client"
import { createTheme } from "@mui/material"

export const theme=createTheme({
    palette:{
        primary:{
            main:"#06A77D",
        },
        placeholder: {
            main: "#64748B", 
          },
    },
    typography:{
        fontFamily: 'Inter, sans-serif',
        
    },
    breakpoints: {
        values: {
          xs: 0, 
          sm: 640, 
          md: 1025, 
          lg: 1280, 
          xl: 1920, 
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              boxShadow: 'none', 
            },
          },
        },
      },
})