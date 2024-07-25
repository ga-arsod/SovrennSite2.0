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
                borderColor: 'red', // Change this to your desired border color
              },
            },
          },
        },
       
      },
})