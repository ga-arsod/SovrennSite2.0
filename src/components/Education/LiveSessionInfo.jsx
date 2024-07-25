"use client";
import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { colors } from "../Constants/colors";
import SlotBookingModal from "../Modal/SlotBookingModal";
import { educationSlotsApi } from "@/app/Redux/Slices/educationSlice";
import { useSelector } from "react-redux";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.04em;

  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    letter-spacing: 0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: ${colors.greyBlue500};
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
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
  padding-top: 14px;
  padding-bottom: 14px;
  line-height: 21px;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;

const StyledListItem = styled(ListItem)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(3), // Adjust to make space for the bullet
  "&::before": {
    content: '"•"',
    position: "absolute",
    left: 0,
    top: "0.75em", // Align the bullet with the first line of text
    color: "#667085",
    fontSize: "1.25em",
    lineHeight: "0", // Ensures the bullet is not affected by line height
  },
}));

const LiveSessionInfo = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.education.educationSlotsBucket);

  useEffect(() => {
    dispatch(educationSlotsApi());
  }, []);
  console.log(data, "data");
  return (
    <>
      {open ? (
        <SlotBookingModal open={open} handleClose={handleClose} />
      ) : (
        <></>
      )}
      <Box>
        <Grid container width="100%" paddingY={{ xs: 3, md: 6 }}>
          <Grid item xs={12} paddingX={3} marginBottom={{ xs: 3, md: 8 }}>
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
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            width="100%"
          >
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              gap={3}
              justifyContent="center"
              paddingX={2}
              paddingBottom={4}
            >
              {LiveSessionInfoArray.map((element, index) => {
                return (
                  <Grid
                    item
                    width={{ width: "100%", sm: "465px", md: "582px" }}
                    key={index}
                    sx={{
                      border: "1px solid #E4E7EC",
                      borderRadius: "8px",
                      position: "relative",
                    }}
                    paddingX={3}
                    paddingY={4}
                  >
                    <List
                      sx={{
                        width: "100%",
                        listStyleType: "disc",
                        padding: 0,
                        height: { xs: "500px", sm: "435px", md: "411px" },
                      }}
                    >
                      <StyledTypography3
                        variant="h6"
                        component="h2"
                        gutterBottom
                        color={colors.headingColor}
                        textAlign={{ xs: "center", sm: "start" }}
                      >
                        {element.h1}
                      </StyledTypography3>
                      {(index === 0
                        ? data?.beginnerPoints
                        : data?.intermediatePoints
                      )?.map((item, index) => {
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
                      sx={{
                        position: "absolute",
                        bottom: "32px",
                        left: "50%",
                        transform: "translate(-50%, 0%)",
                      }}
                    >
                      <Grid item>
                        <Typography textAlign="center">
                          <Typography
                            color={colors.navyBlue400}
                            marginRight={0.5}
                            component="span"
                            paddingTop={2}
                            sx={{
                              fontWeight: "600",
                              fontSize: "14px",
                              lineHeight: "17px",
                            }}
                          >
                            No Upcoming Session
                          </Typography>
                          <Typography
                            color={colors.headingColor}
                            component="span"
                            sx={{
                              fontWeight: "600",
                              fontSize: "14px",
                              lineHeight: "17px",
                            }}
                          ></Typography>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <StyledButton2
                        disabled={index===0 && data?.beginnerList.length==0 || index===1 && data?.interMediateList.length==0}
                        variant="contained" onClick={handleOpen}>
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
