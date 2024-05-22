"use client";
import React from "react";
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { LiveSessionInfoArray } from "@/utils/Data";
import styled from "@emotion/styled";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing:-0.04em;
 
  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    letter-spacing:0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
 color:${colors.greyBlue500}
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing:-0.02em;
  }
`;
const StyledListItemText = styled(ListItemText)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
const StyledButton2 = styled(Button)`
  color: ${colors.white};
  font-weight: 600;
  font-size: 18px;
  background-color: ${colors.themeGreen};
  text-transform: none;
  padding-top:14px;
  padding-bottom:14px;
  line-height: 21px;

  :hover {
    background-color: ${colors.themeButtonHover};
   
  }
 
`;

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&::before": {
    content: '"•"',
    marginRight: theme.spacing(1),
    marginTop: 0,
    color: "#667085",
  },
}));

const LiveSessionInfo = () => {
  return (
    <>
      <Box>
        <Grid container width="100%">
          <Grid item xs={12} marginY={6} paddingX={3}>
            <Typography sx={{ textAlign: "center" }} marginBottom={2}>
              <StyledTypography1
                component="span"
                marginRight={1}
                color={colors.headingColor}
              >
                Discover the Benefits of Enrolling in Our Live
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                Session
              </StyledTypography1>
            </Typography>
            <StyledTypography2 gutterBottom textAlign="center">
              Elevate Your Investing Journey with Expert Knowledge and Practical
              Insights
            </StyledTypography2>
          </Grid>
          <Grid item>
            <Grid container direction={{xs:"column",sm:"row"}} gap={3}  justifyContent="center" paddingX={2} paddingBottom={4} >
            {LiveSessionInfoArray.map((element, index) => {
            return (
              <Grid item xs={5.9} sm={5.6} md={5} key={index} sx={{border: "1px solid #E4E7EC",borderRadius:"8px"}} padding={2} >
                <List
                  sx={{
                    width: "100%",
                    listStyleType: "disc",
                    padding: 0,
                    height: {xs:"45vh",sm:"35vh",md:"45vh"},
                  }}
                >
                  <StyledTypography3
                    variant="h6"
                    component="h2"
                    gutterBottom
                    color={colors.headingColor}
                    textAlign={{xs:"center",sm:"start"}}
                  >
                    {element.h1}
                  </StyledTypography3>
                  {element.listItems.map((item, index) => {
                    return (
                      <StyledListItem sx={{ padding: "0px" }} key={index}>
                        <StyledListItemText
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontWeight: "400",
                              color: "#667085",
                              fontSize: "16px",
                              lineHeight: "24px",
                            },
                          }}
                          primary={item}
                        />
                      </StyledListItem>
                    );
                  })}
                </List>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  spacing={3}
                  marginTop={{xs:4,sm:-2}}
                >
                  <Grid item>
                    <Typography textAlign="center">
                    <Typography
                      color={colors.navyBlue400}
                      marginRight={0.5}
                      component="span"
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "17px",
                      }}
                    >
                      Upcoming Session:
                    </Typography>
                    <Typography
                      color={colors.headingColor}
                      component="span"
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "17px",
                      }}
                    >
                      25th Dec 23 at 2:30 P.M.
                    </Typography>

                    </Typography>
                   
                  </Grid>
                  <Grid item>
                    <StyledButton2 variant="contained">
                      Book a slot
                    </StyledButton2>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

            </Grid>


          </Grid>
         
        </Grid>
      </Box>
    </>
  );
};
export default LiveSessionInfo;
