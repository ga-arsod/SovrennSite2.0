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
import { useState } from "react";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";
import { leaderboardApi } from "@/app/Redux/Slices/examSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EmptyExam from "../../components/Exam/EmptyExam";

const StyledTypography1 = styled(Typography)`
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
`;
const StyledTypography2 = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  background-color: ${colors.themeGreen};
  text-transform: none;
  width: 50%;
  :hover {
    background-color: ${colors.themeGreen};
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
`;

export default function Leaderboard({ pastWinners, setIsPastWinners }) {
  const dispatch = useDispatch();
  const { leaderboardData } = useSelector((store) => store.exam);
  const [winners, setWinners] = useState([]);
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

  const getTopThreeWinners = (winners) => {
    const topThree = winners.slice(0, 3).map((winner, index) => ({
      ...winner,
      rank: index + 1,
    }));

    if (topThree.length === 3)
      setWinners([topThree[1], topThree[0], topThree[2]]);
    if (topThree.length === 2) setWinners([topThree[1], topThree[0]]);
    if (topThree.length === 1) setWinners([topThree[0]]);
  };
  useEffect(() => {
    dispatch(leaderboardApi());
    getTopThreeWinners(leaderboardData?.data?.leaderboard);
  }, []);
  
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundImage: "url('/quiz-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top 0px",
        backgroundRepeat: "no-repeat",
        minHeight: "120vh",
      }}
      marginTop="55px"
    >
      <Grid container justifyContent="center">
        <Grid item width="700px">
          <Container>
            <Grid container>
              <Grid item paddingTop={5}>
                <StyledTypography1 color={colors.navyBlue500} textAlign="left">
                  {leaderboardData?.data?.date}
                </StyledTypography1>
                <StyledTypography2>
                  Exam{" "}
                  <span style={{ color: colors.themeGreen }} textAlign="left">
                    Leaderboard
                  </span>
                </StyledTypography2>
                <StyledTypography3
                  textAlign="left"
                  color={colors.themeGreen}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    mt: 0.5,
                  }}
                  onClick={() => {
                    setIsPastWinners(true);
                  }}
                >
                  View Past Winners &gt;
                </StyledTypography3>
              </Grid>
            </Grid>
          </Container>

          <Grid container width="100%">
            {leaderboardData?.data?.leaderboard?.length ? (
              <Grid item width="100%">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    mt: 4,
                    gap: 3,
                  }}
                >
                  {winners?.map((user, index) => (
                    <Stack
                      key={index}
                      alignItems="center"
                      justifyContent="flex-start"
                      position="relative"
                      sx={{
                        width: "80px",
                        textAlign: "center",
                        position: "relative",
                        top: index === 1 ? 37 : 0,
                      }}
                    >
                      {user.rank === 1 && (
                        <Typography
                          sx={{
                            position: "absolute",
                            top: -40,
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: 35,
                          }}
                        >
                          👑
                        </Typography>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        {user?.profile_pic ? (
                          <Avatar
                            src={user.profile_pic}
                            sx={{
                              width: user.rank === 1 ? 90 : 70,
                              height: user.rank === 1 ? 90 : 70,
                              border: `4px solid ${
                                user.rank == 1
                                  ? "#FFCA28"
                                  : user.rank == 2
                                  ? "#38B997"
                                  : "#38B997"
                              }`,
                              bgcolor: "#36444F",
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: user.rank === 1 ? 90 : 64,
                              height: user.rank === 1 ? 90 : 64,
                              bgcolor: "#36444F",
                              border: `4px solid ${
                                user.rank == 1
                                  ? "#FFCA28"
                                  : user.rank == 2
                                  ? "#55636E"
                                  : "#38B997"
                              }`,
                            }}
                          >
                            {getFirstLetters(user?.first_name).toUpperCase() +
                              getFirstLetters(user?.last_name).toUpperCase()}
                          </Avatar>
                        )}

                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -15,
                            color: "#F4F3F3",
                            left: "50%",
                            transform: "translateX(-50%)",
                            bgcolor: "#034635",
                            borderRadius: "50%",
                            width: 30,
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            border: "2px solid #06A77D",
                          }}
                        >
                          {user.rank}
                        </Box>
                      </Box>

                      <Typography
                        fontWeight={600}
                        sx={{
                          mt: 2,
                          maxWidth: "100px",
                          minHeight: "40px",
                          textAlign: "center",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {`${user.first_name} ${user.last_name}`}
                      </Typography>
                    </Stack>
                  ))}
                </Box>

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
                  <Grid
                    container
                    gap={2}
                    sx={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ccc",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {leaderboardData?.data?.leaderboard?.map((user, index) => (
                      <Grid
                        item
                        xs={12}
                        key={index}
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: "8px",
                          marginBottom: "0px",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flex: 1,
                          }}
                        >
                          <Typography
                            color={colors.navyBlue500}
                            fontWeight={600}
                            sx={{ fontSize: "12px", lineHeight: "14px" }}
                          >
                            {`#${index + 1}`}
                          </Typography>
                          {user?.profile_pic ? (
                            <Avatar
                              src={user?.profile_pic}
                              sx={{
                                width: 48,
                                height: 48,
                                border: "2px solid #ccc",
                                bgcolor: "#36444F",
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                border: "2px solid #ccc",
                                bgcolor: "#36444F",
                              }}
                            >
                              {getFirstLetters(user?.first_name).toUpperCase() +
                                getFirstLetters(user?.last_name).toUpperCase()}
                            </Avatar>
                          )}

                          <Typography
                            color={colors.navyBlue300}
                            fontWeight={600}
                            sx={{
                              fontSize: "16px",
                              lineHeight: "19px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {`${user.first_name} ${user.last_name} `}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 2,
                            flex: 1,
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
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            ) : (
              <Grid item width="100%">
                <EmptyExam />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            boxShadow: "0px 1px 15px 5px #0000001A",

            p: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!leaderboardData?.data?.user_rank ? (
            <StyledButton2>Start the exam, claim your rank!</StyledButton2>
          ) : (
            <Grid
              container
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: "8px",
                marginBottom: "0px",
                backgroundColor: "#E6F6F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "680px",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flex: 1,
                }}
              >
                <Typography
                  color={colors.navyBlue500}
                  fontWeight={600}
                  sx={{ fontSize: "12px", lineHeight: "14px" }}
                >
                  {`#${leaderboardData?.data?.user_rank?.rank}`}
                </Typography>
                {leaderboardData?.data?.user_rank?.profile_pic ? (
                  <Avatar
                    src={leaderboardData?.data?.user_rank?.profile_pic}
                    sx={{
                      width: 48,
                      height: 48,
                      border: "2px solid #ccc",
                      bgcolor: "#36444F",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      border: "2px solid #ccc",
                      bgcolor: "#36444F",
                    }}
                  >
                    {getFirstLetters(
                      leaderboardData?.data?.user_rank?.first_name
                    ).toUpperCase() +
                      getFirstLetters(
                        leaderboardData?.data?.user_rank?.last_name
                      ).toUpperCase()}
                  </Avatar>
                )}

                <Typography
                  color={colors.navyBlue300}
                  fontWeight={600}
                  sx={{
                    fontSize: "16px",
                    lineHeight: "19px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {`${leaderboardData?.data?.user_rank?.first_name} ${leaderboardData?.data?.user_rank?.last_name} `}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 2,
                  flex: 1,
                }}
              >
                <Typography
                  color={colors.navyBlue300}
                  fontWeight={600}
                  sx={{ fontSize: "14px", lineHeight: "17px" }}
                >
                  {convertSecondsToTime(
                    leaderboardData?.data?.user_rank?.time_taken
                  )}
                </Typography>
                <Typography
                  color={colors.navyBlue300}
                  fontWeight={600}
                  sx={{ fontSize: "14px", lineHeight: "17px" }}
                >
                  {leaderboardData?.data?.user_rank?.score}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
