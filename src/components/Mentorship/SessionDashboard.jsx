"use client";
import React from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CommunityCertificateSection from "./CommunityCertification";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import Image from "next/image";
import moment from 'moment';

const StyledTypography1 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
`;
const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;
const StyledTypography4 = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
`;
const StyledTypography5 = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeGreen};
  }
`;
export default function SessionDashboard({ data ,setTimelineOpen}) {
  const previousSessions = Array(6).fill({
    title: "5th Jun - First Doubt Session",
    subtitle: "We discussed about the investing basics with real life",
    duration: "30m 50s",
  });
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Box
      sx={{
        bgcolor: "#E6E8E9",
        py: 4,
        px:2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box bgcolor="white" paddingY={{xs:2.5,sm:5}} paddingX={{xs:1.5,sm:5}} width={{xs:"100%",sm:"85%"}} borderRadius="8px">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                border: "1px solid #DEDDDD",
                borderRadius: "16px",
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "none",
                position: "relative", 
              }}
            >
              {data?.upcoming_session?.is_live && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 22,
                    bgcolor: colors.red500,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "14px",
                    px: 1.5,
                    py: 0.3,
                    borderRadius: "2px",
                    zIndex: 10,
                  }}
                >
                  Live Right Now
                </Box>
              )}

              <StyledTypography1 mb={1} color={colors.neutral900}>
                Upcoming Session
              </StyledTypography1>

              <Grid container>
                {data?.progress?.completed_sessions ==
                  data?.progress?.total_sessions ? (
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="/sessions-completed-image.png"
                        alt="icon"
                        width={257}
                        height={279}
                      />
                      <StyledTypography2
                        sx={{ mt: 2 }}
                        color={colors.neutral900}
                      >
                        Congratulations! all sessions are complete—no upcoming
                        sessions ahead!
                      </StyledTypography2>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item>
                    <Box
                      component="img"
                      src={data?.upcoming_session?.image_url}
                      alt="calendar"
                      sx={{ width: "100%", height: 142, mb: 2.5, mt: 1.5 }}
                    />
                    <Grid container gap={1.5}>
                      {data?.upcoming_session?.details?.map((item, i) => (
                        <React.Fragment key={i}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Box
                              component="img"
                              src={item?.prefix_icon_url}
                              alt="calendar"
                              sx={{ width: 30, height: 30 }}
                            />
                            <StyledTypography3 color={colors.neutral900}>
                              {item?.text}
                            </StyledTypography3>
                          </Stack>
                          <Divider sx={{ my: 0, borderColor: "#F4F3F3" }} />
                        </React.Fragment>
                      ))}
                    </Grid>

                    <StyledButton1
                      fullWidth
                      variant="contained"
                      disabled={!data?.upcoming_session?.is_live}
                      sx={{ my: 2.5 }}
                      onClick={() => {
                        if (data?.upcoming_session?.zoom_link) {
                          window.open(
                            data.upcoming_session.zoom_link,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                    >
                      Join Now
                    </StyledButton1>

                    <StyledTypography4 color="#4F4F4F" align="center">
                      {data?.upcoming_session?.text}
                    </StyledTypography4>

                    <StyledTypography1
                      sx={{
                        color: colors.themeGreen,
                        mt: 2,
                        cursor: "pointer",
                        textAlign: "center",
                        textDecoration: "underline",
                        textDecorationColor: colors.themeGreen,
                        textUnderlineOffset: "3px",
                      }}
                      onClick={()=>{setTimelineOpen(true)}}
                    >
                      View Detailed Timeline &gt;
                    </StyledTypography1>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card
              sx={{
                border: "1px solid #DEDDDD",
                borderRadius: "16px",
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
              }}
            >
              <StyledTypography1 color={colors.neutral900} mb={1}>
                Previous Session Recording
              </StyledTypography1>
              {data?.progress?.completed_sessions < 1 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/no-sessions-recording-image.png"
                    alt="icon"
                    width={309}
                    height={336}
                  />
                  <StyledTypography2
                    sx={{ mt: 2 }}
                    color={colors.neutral900}
                    textAlign="center"
                    px={10}
                  >
                    All session recordings will appear here—watch anytime, at
                    your pace!
                  </StyledTypography2>
                </Box>
              ) : (
                <Box
                  sx={{
                    overflowY: "auto",
                    pr: 1,
                    "&::-webkit-scrollbar": {
                      width: "3px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#D9D9D9",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#D9D9D9",
                    },
                    scrollbarWidth: "thin",
                    scrollbarColor: "#D9D9D9 transparent",
                  }}
                >
                  <List disablePadding>
                    {selectedVideoUrl && (
                      <Box
                        sx={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 1300,
                          flexDirection: "column",
                        }}
                      >
                      
                        <IconButton
                          onClick={() => setSelectedVideoUrl(null)}
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            color: "white",
                            zIndex: 1400,
                            fontSize: 28,
                          }}
                        >
                          ✕
                        </IconButton>

                      
                        <Box
                          sx={{
                            width: "90%",
                            maxWidth: "900px",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <video width="100%" controls autoPlay>
                            <source src={selectedVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </Box>
                      </Box>
                    )}
                    {data?.previous_sessions?.details?.map((session, index) => (
                      <React.Fragment key={index}>
                        <Box
                          onClick={() =>
                            setSelectedVideoUrl(session?.recording?.video_url)
                          }
                          sx={{ cursor: "pointer" }}
                        >
                          <ListItem
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              py: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minWidth: 60,
                                mr: 2,
                              }}
                            >
                              <PlayCircleFilledIcon
                                sx={{ color: colors.themeGreen, fontSize: 40 }}
                              />
                              <Typography
                                sx={{
                                  lineHeight: "14px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  mt: 0.5,
                                }}
                                color={colors.neutral800}
                              >
                                {formatDuration(
                                  session?.recording?.video_duration || 0
                                )}
                              </Typography>
                            </Box>

                            <ListItemText
                              primary={
                                <>
                                  <StyledTypography5 color={colors.neutral700}>
                                    {moment(session?.date).format("Do MMM YY")}
                                  </StyledTypography5>
                                  <StyledTypography2
                                    color={colors.neutral900}
                                    my={0.5}
                                  >
                                    {session?.title}
                                  </StyledTypography2>
                                </>
                              }
                              secondary={
                                <StyledTypography5 color={colors.neutral700}>
                                  {session?.description}
                                </StyledTypography5>
                              }
                            />
                          </ListItem>
                        </Box>

                        {index < previousSessions?.length - 1 && (
                          <Divider sx={{ my: 0, borderColor: "#F4F3F3" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
        <Grid container>
          <CommunityCertificateSection certificate={data?.certificate} whatsapp={data?.whatsapp} />
        </Grid>
      </Box>
    </Box>
  );
}
