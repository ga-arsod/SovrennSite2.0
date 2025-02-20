"use client";

import {
  Box,
  Button,
  Card,
  Typography,
  Avatar,
  Stack,
  Container,
  Grid,
} from "@mui/material";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";

import { useDispatch } from "react-redux";

const leaderboardData = [
  { name: "Iman", time: "10min 5s", score: 52, img: "/iman.jpg" },
  { name: "Vatani", time: "10min 5s", score: 52, img: "/vatani.jpg" },
  { name: "Jonathan", time: "10min 5s", score: 52, img: "/jonathan.jpg" },
  { name: "Neuman", time: "10min 5s", score: 52, img: "/neuman.jpg" },
  { name: "Nick", time: "10min 5s", score: 52, img: "/nick.jpg" },
];

const StyledTypography2 = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: -0.02em;
`;


export default function PastWinners({ pastWinners }) {
  const getFirstLetters = (str) =>
    str
      .split(" ")
      .map((word) => word[0])
      .join("");

  const convertSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundImage: "url('/quiz-background.png')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center top 0px", // Moves the image upward
        backgroundRepeat: "no-repeat",
        minHeight: "120vh", // Ensures it covers the viewport height
      }}
      marginTop="55px"
    >
      <Grid container justifyContent="center">
        <Grid item width="700px">
          <Container>
            <Grid container>
              <Grid item paddingTop={5}>
                <StyledTypography2>
                  Past{" "}
                  <span style={{ color: colors.themeGreen }} textAlign="left">
                    Winners
                  </span>
                </StyledTypography2>
              </Grid>
            </Grid>
          </Container>
          <Grid container>
            <Grid item>
              <Card
                sx={{
                  mt: 4,
                  p: 2,
                  maxWidth: 700,
                  mx: "auto",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                <Grid container gap={2}>
                  {" "}
                  {/* Adds spacing between items */}
                  {pastWinners.map((user, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      sx={{
                        py: 1,
                        px: 2,
                        borderRadius: "8px",

                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Grid container flexDirection="column">
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            textAlign="center"
                            sx={{
                              fontSize: "12px",
                              fontWeight: "400",
                              lineHeight: "14px",
                            }}
                            color={colors.navyBlue300}
                          >
                            {user?.date}
                          </Typography>

                          <Typography
                            textAlign="center"
                            sx={{
                              fontSize: "12px",
                              fontWeight: "400",
                              lineHeight: "14px",
                            }}
                            color={colors.navyBlue300}
                          >
                            {user?.total_participants}
                          </Typography>
                        </Grid>
                        <Grid
                        item
                        sx={{
                          display: "flex",

                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                            gap: 1,
                            flex: 1,
                          }}
                        >
                          {user?.profile_pic ? (
                            <Avatar
                              src={user.profile_pic}
                              sx={{
                                width: 48,
                                height: 48,
                                border: "2px solid #ccc",
                                bgcolor: "#36444F",
                              }}
                            />
                          ) : (
                            <Avatar
                              src={user.img}
                              sx={{
                                width: 48,
                                height: 48,
                                border: "2px solid #ccc",
                                bgcolor: "#36444F",
                              }}
                            >
                              {" "}
                              {getFirstLetters(user?.first_name).toUpperCase() +
                                getFirstLetters(user?.last_name).toUpperCase()}
                            </Avatar>
                          )}

                          <Typography
                            color={colors.navyBlue300}
                            fontWeight={600}
                            textAlign="left"
                            sx={{
                              fontSize: "16px",
                              lineHeight: "19px",
                              width: "150px",
                            }}
                          >
                            {`${user.first_name} ${user.last_name}`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",
                            gap: 3,
                            
                          }}
                        >
                          <Typography
                            color={colors.navyBlue300}
                            fontWeight={600}
                            sx={{ fontSize: "14px", lineHeight: "17px" }}
                          >
                            {convertSecondsToTime(user?.time_taken)}
                          </Typography>
                          <Typography
                            color={colors.navyBlue300}
                            fontWeight={600}
                            sx={{ fontSize: "14px", lineHeight: "17px" }}
                          >
                            {user?.score}
                          </Typography>
                        </Box>
                        
                      </Grid>
                      </Grid>
                     
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
