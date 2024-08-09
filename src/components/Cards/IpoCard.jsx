import React from "react";
import { Grid, Typography, Box, Button ,Divider} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";


const StyledTypography3 = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;

const IpoCard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid
        container
        marginBottom={5}
        justifyContent="center"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
          padding: { xs: 1 }, 
        }}
      >
        {Array.from("abcderhjkjkk").map((item, index) =>{
            return (
                <Box
                  key={index} 
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    position: 'relative',
                    backgroundColor: "#EFF2F4",
                    borderRadius: "4px",
                    maxWidth: "474px",
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "auto",
                  }}
                >
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: '#C5EFC5',
                      color: 'black',
                      borderRadius: '0px 4px 0px 4px',
                      padding: '8px 22px',
                     
                    }}
                  >
                   <Typography sx={{ fontSize: '10px',
                      fontWeight: '600',
                      lineHeight: '12px',}}>Open</Typography>
                  </Box>

                  <StyledTypography2 variant="h6" component="div" marginBottom={1}>
                    Electro Force (India) Ltd.
                  </StyledTypography2>
                  
                  <Grid container justifyContent="space-between">
                    <Grid item xs={6}>
                      <StyledTypography3 color={colors.greyBlue900} sx={{ fontWeight: "400" }} component="span">
                        {`Sector : `}
                      </StyledTypography3>
                      <StyledTypography3 color={colors.navyBlue500} sx={{ fontWeight: "600" }} component="span">
                        Textile
                      </StyledTypography3>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <StyledTypography3 color={colors.greyBlue900} sx={{ fontWeight: "400" }} component="span">
                        {`Offer Price P.E. :`}
                      </StyledTypography3>
                      <StyledTypography3 color={colors.navyBlue500} sx={{ fontWeight: "600" }} component="span">
                        11.8x
                      </StyledTypography3>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" marginTop={1}>
                    <Grid item xs={6}>
                      <StyledTypography3 color={colors.greyBlue900} sx={{ fontWeight: "400" }} component="span">
                        {`Open Date :`}
                      </StyledTypography3>
                      <StyledTypography3 color={colors.navyBlue500} sx={{ fontWeight: "600" }} component="span">
                        19th Dec 23
                      </StyledTypography3>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <StyledTypography3 color={colors.greyBlue900} sx={{ fontWeight: "400" }} component="span">
                        {`Close Date :`}
                      </StyledTypography3>
                      <StyledTypography3 color={colors.navyBlue500} sx={{ fontWeight: "600" }} component="span">
                        21st Dec 23
                      </StyledTypography3>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" marginTop={1}>
                    <Grid item xs={6}>
                      <StyledTypography3 color={colors.greyBlue900} sx={{ fontWeight: "400" }} component="span">
                        {`Listing Date :`}
                      </StyledTypography3>
                      <StyledTypography3 color={colors.navyBlue500} sx={{ fontWeight: "600" }} component="span">
                        27th Dec 23
                      </StyledTypography3>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <StyledTypography3 color={colors.greyBlue900} sx={{ fontWeight: "400" }} component="span">
                        {`LY Sales Growth :`}
                      </StyledTypography3>
                      <StyledTypography3 color={colors.navyBlue500} sx={{ fontWeight: "600" }} component="span">
                        12%
                      </StyledTypography3>
                    </Grid>
                  </Grid>
                  <Divider sx={{ paddingBottom: "8px", borderColor: "#E6E6E6" }} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <StyledButton2 variant="contained" color="primary">
                      Read
                    </StyledButton2>
                  </Box>
                </Box>
            )
        })}
      </Grid>
    </Box>
  );
};

export default IpoCard;