'use client';

import { Box, Button, TextField, Typography, Paper ,Grid,InputLabel} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color:white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding:12px 20px;
  text-transform: none;
  background-color:${colors.themeGreen};
 
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
  width:100%;
   padding:12px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;
const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21.5px;
  margin-bottom:3px;
  color: ${colors.navyBlue800};
   display: block; 
  text-align: left; 
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: "12px 8px",
    color: colors.navyBlue900,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "17px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.60rem",
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "0.90rem",
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: colors.navyBlue900,
    caretColor: colors.navyBlue900,
  },
}));
export default function KnowledgeTestForm() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        marginTop:"60px",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/test-your-investing-bg.png)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding:{xs:2,sm:4},
          borderRadius: 2,
          zIndex: 2,
          width:{xs:"95%",sm:"540px"},
          textAlign: "center",
        }}
      >
        <StyledTypography1  color={colors.themeGreen} >
          Test Your Investing Knowledge in 3 mins
        </StyledTypography1>
        <Box component="form" noValidate autoComplete="off" >
          <Grid container direction="column" paddingTop={2}>
           
            <Grid item>
              <StyledInputLabel htmlFor="full_name">
              Your Full Name
              </StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="full_name"
                required
                name="full_name"
                placeholder="Enter your full name"
               
                fullWidth
              />
            </Grid>
            <Grid item>
              <StyledInputLabel htmlFor="phone_number">
              Your Phone No.
              </StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="phone_number"
                required
                name="phone_number"
                placeholder="Enter your Phone no."
               
                fullWidth
              />
            </Grid>
            <Grid item>
              <StyledInputLabel htmlFor="email">
              Your Email Id
              </StyledInputLabel>

              <CustomTextField
                sx={{ marginBottom: "16px" }}
                id="email"
                required
                name="email"
                placeholder="Enter your email id"
               
                fullWidth
              />
            </Grid>

          </Grid>
         
         
          <StyledButton1 fullWidth type="submit" variant="contained">
          Start Test Now 
              </StyledButton1>
        </Box>
      </Paper>
    </Box>
  );
}
