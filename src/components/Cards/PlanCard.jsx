"use client"
import { Grid, Typography, Button, IconButton, Box } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../Constants/colors";

const StyledTypography = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #667085;
  text-transform: none;
 
`;

const StyledButton = styled(Button)`
  border:  1px solid #E4E7EC;
  color: #344054;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0px 1px 2px 0px #1018280d;
  text-transform: none;
  @media (min-width: 701px) and (max-width: 900px) {
    font-weight: 500;
    text-transform: none;
    font-size: 13px;
    line-height: 16px;
    color: #667085;
  }
`;
const StyledButton2 = styled(Button)`
  :hover {
    background-color: ${colors.themeButtonHover};

    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;
const StyledGrid = styled(Grid)`
  border:1px solid #E4E7EC;
  box-shadow: 0px 4px 6px -2px #1018280D;

  box-shadow: 0px 12px 16px -4px #1018281A;
  
  border-radius: 16px;
`;

const PlanCard = ({ element }) => {
  return (
    <StyledGrid
      container
      height="100%"
      justifyContent="center"
      alignItem="center"
      padding={{xs:2,sm:4}}
    >
      <Grid item >
        <Grid container direction="column"  paddingX={0}>
          <Grid item>
            <Grid container direction="column" >
              <Grid item marginBottom="22px">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <StyledTypography>{element.planName}</StyledTypography>
                  </Grid>
                  <Grid
                    item
                    sx={{ visibility: element.popular ? "" : "hidden" }}
                  >
                    <Box backgroundColor="#E8F6F5" borderRadius="20px">
                      <Typography
                        color="#15726C"
                        padding={1}
                        sx={{
                          fontWeight: "500",
                          fontSize:"14px",
                          lineHeight: "20px",
                        }}
                      >
                        Popular
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item marginBottom={2} >
                    <Typography
                      color="#101828"
                      
                      marginRight="4px"
                      sx={{
                        fontSize:"60px",
                        fontWeight: "600",
                        lineHeight: "72px",
                        letterSpacing:"-0.04em",
                        display:{xs:"block",md:"inline-block"}
                      }}
                    >
                      {` ₹${element.price}`}
                    </Typography>
                    <Typography
                      color="#597082"
                    
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "19px",
                        display:{xs:"block",md:"inline-block"}
                      }}
                    >
                      {`for ${element.validity}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item >
                <Typography
                  color="#597082"
                  sx={{
                    fontSize: { xs: "16px", sm: "14px", md: "16px" },
                    fontWeight: "400px",
                    lineHeight: "24px",
                  }}
                >
                  {element.planDescription}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{ visibility: element.applicable ? "" : "hidden" }}
                marginTop={2}
              >
                <Typography
                  color="#96A7B4"
                  sx={{
                    fontSize: { xs: "16px", sm: "14px", md: "16px" },
                    fontWeight: "400px",
                    lineHeight: "24px",
                  }}
                >
                  *(Applicable only once)
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginTop={{xs:5,sm:6}}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <StyledButton2
                  fullWidth
                  variant="contained"
                  sx={{
                    paddingY: "10px",
                    backgroundColor: colors.themeGreen,
                    fontWeight: "500",
                    fontSize: { xs: "18px", sm: "16px", md: "18px" },
                    lineHeight: "21px",
                    color: "white",
                    textTransform: "none",
                    paddingY: "12px",
                  }}
                >
                  Buy Now
                </StyledButton2>
              </Grid>
              <Grid item>
                <StyledButton fullWidth variant="outlined">
                  Contact Sales
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item marginTop={4}>
            <Grid container>
              <Grid item padding={{xs:0,sm:4}}>
                {element.features.map((item, index) => {
                  return (
                    <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      wrap="nowrap"
                      key={index}
                    >
                      <Grid item>
                        <IconButton>
                          {item.accessibility ? (
                            <CheckIcon
                              fontSize="medium"
                              sx={{
                                color: colors.themeGreen,
                                backgroundColor: "#B9E2DF",
                                borderRadius: "50%",
                                padding: "4px",
                              }}
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              sx={{
                                color: "#FB8E8E",
                                backgroundColor: "#B9E2DF",
                                borderRadius: "50%",
                                padding: "4px",
                              }}
                            />
                          )}
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography
                          color="#667085"
                          sx={{
                            fontWeight: "400",
                            fontSize: { xs: "16px", sm: "13px", md: "16px" },
                            lineHeight: { xs: "24px", sm: "16px", md: "24px" },
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default PlanCard;
