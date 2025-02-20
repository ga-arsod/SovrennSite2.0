"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Stack,
  Divider,
  Container,
  AvatarGroup,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PdfViewer from "../PdfViewer";
import { useState } from "react";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import {
  examRulesApi,
  examApi,
  getExamCertificate,
} from "@/app/Redux/Slices/examSlice";
import { useEffect } from "react";
import ExamModal from "../Modal/ExamModal";
import { useSelector } from "react-redux";

import Link from "next/link";

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.04em;

  @media (max-width: 639px) {
    font-size: 19px;
    line-height: 23px;
    letter-spacing: -0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
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
export default function ExamHomePage({ setIsExamStart }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { exam, examCertificate } = useSelector((store) => store.exam);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const getFirstLetters = (str) =>
    str
      .split(" ")
      .map((word) => word[0])
      .join("");
  const dispatch = useDispatch();
 
  const handleOpenCertificate = (url) => {
    
      
      
    
      const newTab = window.open(url, "_blank", "noopener,noreferrer");
  
    
      if (!newTab) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = "Certificate.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    
  };
  useEffect(() => {
    dispatch(examRulesApi());
    dispatch(getExamCertificate());
    dispatch(examApi());
  }, []);
  console.log(examCertificate, "exam certificate");
  return (
    <>
      <ExamModal
        setIsExamStart={setIsExamStart}
        isExamModalOpen={isExamModalOpen}
        setIsExamModalOpen={setIsExamModalOpen}
      />
      <Container>
        <Box marginY="90px">
          <Box marginBottom={1} display="flex" alignItems="center">
            {isMobile && (
              <ArrowBackIcon
                sx={{
                  fontSize: 28,
                  marginRight: { xs: 1, sm: 2 },
                  color: colors.navyBlue500,
                }}
              />
            )}
            <Box display="flex" flexWrap="wrap" alignItems="center">
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
                {`Test Your `}
                <span style={{ color: colors.themeGreen }}>
                  Investing Knowledge
                </span>
              </StyledTypography1>
            </Box>
          </Box>

          <Grid container spacing={3} marginTop={{ xs: 1, sm: 3 }}>
            {exam?.exams?.map((elem, index) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      p: 1,
                      height: { xs: "280px", sm: "255px" },
                      boxShadow: "none",
                      border: "1px solid #E4E7EC",
                      borderRadius: "16px",
                      position: "relative",
                    }}
                  >
                    <CardContent>
                      <StyledTypography2 color="#20385E">
                        {elem?.title}
                      </StyledTypography2>
                      <StyledTypography3 color="#96A7B4" mt={1}>
                        {elem?.subtitle}
                      </StyledTypography3>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mt={1}
                      >
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <AccessTimeIcon
                            fontSize="small"
                            color="action"
                            sx={{ color: "#96A7B4" }}
                          />
                          <StyledTypography3 color="#96A7B4">
                            {`${elem.time / 60} mins`}
                          </StyledTypography3>
                        </Box>
                        <Typography variant="body2" color="#96A7B4">
                          •
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <MenuBookIcon
                            fontSize="small"
                            color="action"
                            sx={{ color: "#96A7B4" }}
                          />
                          <StyledTypography3 color="#96A7B4">
                            {`${elem?.total_questions} Questions`}
                          </StyledTypography3>
                        </Box>
                      </Stack>
                      {elem?.attempted_users?.length &&
                      elem?.total_participants ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                          mt={2}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            sx={{ position: "relative", width: 60 }}
                          >
                            <AvatarGroup max={3}>
                              {elem?.attempted_users?.map((ele, index) => {
                                return (
                                  <>
                                    {ele?.profile_pic ? (
                                      <Avatar
                                        alt="exam-users-profile-pic"
                                        src={ele?.profile_pic}
                                        key={index}
                                        sx={{
                                          width: 24,
                                          height: 24,
                                          bgcolor: "#36444F",
                                        }}
                                      />
                                    ) : (
                                      <Avatar
                                        sx={{
                                          width: 24,
                                          height: 24,
                                          bgcolor: "#36444F",
                                          fontSize: "10px",
                                        }}
                                        key={index}
                                        alt="exam-users-profile-pic"
                                      >
                                        {getFirstLetters(
                                          ele?.name
                                        ).toUpperCase()}
                                      </Avatar>
                                    )}
                                  </>
                                );
                              })}
                            </AvatarGroup>
                          </Box>
                          <Typography
                            color="#4D5E7C"
                            sx={{
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "19px",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {`${elem?.total_participants}`}
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </CardContent>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 6,
                        left: 0,
                        width: "100%",
                        p: 2,
                      }}
                    >
                      <Divider sx={{ mb: 3 }} />
                      <StyledButton2
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          setIsExamModalOpen(true);
                        }}
                      >
                        Start Now
                      </StyledButton2>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
            {exam?.leaderboards?.map((ele, index) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      height: { xs: "280px", sm: "255px" },
                      boxShadow: "none",
                      border: "1px solid #E4E7EC",
                      borderRadius: "16px",
                      position: "relative",
                    }}
                  >
                    <CardContent>
                      <StyledTypography2 color="#20385E">
                        {ele?.title}
                      </StyledTypography2>
                      <StyledTypography3 color="#96A7B4" mt={1}>
                        {ele?.subtitle}
                      </StyledTypography3>
                    </CardContent>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 6,
                        left: 0,
                        width: "100%",
                        p: 2,
                      }}
                    >
                      <Divider sx={{ mb: 3 }} />
                      <Link href="/exam/leaderboard">
                        <StyledButton2 variant="contained" fullWidth>
                          View Now
                        </StyledButton2>
                      </Link>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {examCertificate?.length ? (
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "20px",
                lineHeight: "24px",
                paddingX: 2,
              }}
              mt={4}
              mb={2}
              color="#1C1C1C"
            >
              Your Certificates
            </Typography>
          ) : (
            <></>
          )}

          <Grid container spacing={2}>
            {examCertificate?.map((cert, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    border: "1px solid #E4E7EC",
                    boxShadow: "none",
                  }}
                >
                  <Box
                    component="img"
                    src="/pdf-icon.png"
                    alt="PDF Icon"
                    sx={{ width: 40, height: 40, mr: 2, borderRadius: 0 }}
                  />
                  <Typography
                    sx={{
                      flexGrow: 1,
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "19px",
                    }}
                    color="#8195A5"
                  >
                    {cert?.file_title}
                  </Typography>
                  <Button
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      lineHeight: "24px",
                      color: colors.themeGreen,
                      textTransform: "none",
                    }}
                   onClick={()=>{handleOpenCertificate(cert?.certificate_url)}}
                  >
                    View
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
