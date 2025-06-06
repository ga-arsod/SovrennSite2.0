"use client"
import { createTheme } from "@mui/material"
import { colors } from "@/components/Constants/colors"

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
      fontFamily: "'DM Sans', sans-serif",
        h1: {
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          fontSize: '2rem', 
          '@media (min-width:600px)': {
            fontSize: '2.5rem',
          },
          '@media (min-width:900px)': {
            fontSize: '3rem',
          },
          '@media (min-width:1200px)': {
            fontSize: '3.5rem',
          },
        },
        
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
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-input': {
                fontSize: '16px', 
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              boxShadow: 'none', 
              '&:hover': {
                boxShadow: 'none',
              },
              '&.Mui-disabled': {
                borderColor: '#CED6DC',
                backgroundColor: '#CED6DC',
                color: '#597082',
              },
            },
          },
        },
        MuiCircularProgress: {
          styleOverrides: {
            root: {
              color: '#06A77D',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              backgroundColor:colors.white,
              borderRadius: '4px',
              input: {
                paddingX: '0px',
                paddingY:'0px', 
                '&::placeholder': {
                  color:colors.greyBlue300, 
                  opacity: 1,
                },
              },
              
              '& .MuiInputBase-root': {
                color: colors.navyBlue200,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor:colors.navyBlue200,
                },
                '&:hover fieldset': {
                  border: `1px solid ${colors.navyBlue200}`,
                },
                '&.Mui-focused fieldset': {
                  border: `1px solid ${colors.navyBlue200}`,
                },
              },
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            select: {
              '&:focus': {
                borderColor: 'red', 
              },
            },
          },
        },
       
      },
})