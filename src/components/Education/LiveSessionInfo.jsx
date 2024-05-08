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

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px @media (max-width: 700px) {
    font-weight: 600;
    font-size: 14px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;
const StyledListItemText = styled(ListItemText)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 17px;
  background-color: ${(props) => props.theme.palette.primary.main};
  text-transform: none;
  line-height: 21px;

  :hover {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
  @media (max-width: 700px) {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
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
        <Grid container width="100%" spacing={8} paddingX={14} paddingY={5}>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }} gutterBottom>
              <StyledTypography1
                component="span"
                marginRight={1}
                color="#0D1726"
              >
                Discover the Benefits of Enrolling in Our Live
              </StyledTypography1>
              <StyledTypography1 component="span" color="#1DA098">
                Session
              </StyledTypography1>
            </Typography>
            <StyledTypography2 gutterBottom textAlign="center" color="#627B8F">
              Elevate Your Investing Journey with Expert Knowledge and Practical
              Insights
            </StyledTypography2>
          </Grid>
          {LiveSessionInfoArray.map((element, index) => {
            return (
              <Grid item md={6} key={index}>
                <List
                  sx={{
                    width: "100%",
                    listStyleType: "disc",
                    padding: 0,
                    height: "46vh",
                  }}
                >
                  <StyledTypography3
                    variant="h6"
                    component="h2"
                    gutterBottom
                    color="#101828"
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
                              lineHeight: "19px",
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
                >
                  <Grid item>
                    <Typography
                      color="#667085"
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
                      color="#101828"
                      component="span"
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "17px",
                      }}
                    >
                      25th Dec 23 at 2:30 P.M.
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
      </Box>
    </>
  );
};
export default LiveSessionInfo;
