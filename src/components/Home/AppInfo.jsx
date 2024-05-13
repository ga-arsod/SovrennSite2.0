"use client";
import { Grid, Box, Typography, Button } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;
const AppInfo = () => {
  return (
    <Box backgroundColor="#F3FAFB" width="100%">
      <Grid
        container
        direction="column"
        spacing={10}
        paddingBottom={{ xs: 3, sm: 13 }}
        justifyContent="center"
        paddingX={2}
      >
        <Grid item>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            paddingTop={8}
          >
            <Grid item>
              <StyledTypography1
                textAlign="center"
                component="div"
                color="#0D1726"
                marginRight={1}
                gutterBottom
              >
                Still have questions?
              </StyledTypography1>
              <StyledTypography2
                textAlign="center"
                component="div"
                color="#627B8F"
                sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px" }}
              >
                Your Questions Matter, and We&apos;re Here to Help!
              </StyledTypography2>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                startIcon={<MailOutlineIcon />}
                sx={{
                  color: "white",
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: "16px",
                  backgroundColor: "#20365B",
                  lineHeight: "35px",
                }}
              >
                Write to Us
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={5}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Typography
                textAlign={{ xs: "center", sm: "start" }}
                component="div"
                color="#0D1726"
                sx={{ fontWeight: "600", fontSize: "23px", lineHeight: "28px" }}
                gutterBottom
              >
                Experience the ease of Sovrenn with our mobile app
              </Typography>
              <Typography
                textAlign={{ xs: "center", sm: "start" }}
                component="div"
                color="#627B8F"
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "12px", sm: "16px" },
                  lineHeight: { xs: "14px", sm: "19px" },
                }}
              >
                simplify your investment journey and start investing at your
                fingertips!
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                spacing={1}
                direction={{ xs: "row", sm: "column" }}
              >
                <Grid item>
                  <Image
                    src="/playStore.png"
                    width={132}
                    height={44}
                    alt="play-store"
                  />
                </Grid>
                <Grid item>
                  <Image
                    src="/appStore.png"
                    width={132}
                    height={44}
                    alt="app-store"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppInfo;
