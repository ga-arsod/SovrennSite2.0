import { Grid, Box, Avatar, Typography, Stack,AvatarGroup } from "@mui/material";
import React from "react";

import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { gradientColors } from "../Constants/colors";

const StyledGrid = styled(Grid)`
  @media (min-width: 640px) and (max-width: 1024px) {
    height: 35vh;
  }
  height: 100vh;
  padding-right:0px;
`;
const infoObj = {
  h1: "Start your investing journey.",
  h2: "Create a free account and get access to all free features of Sovrenn to equip yourself with financial Knowledge.",
  h3: "Get started in 2 minutes.",
  users: "20,000+",
};

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 55px;
  line-height: 55px;
  letter-spacing: -0.04em;
  @media (min-width: 640px) and (max-width: 1024px) {
    font-size: 34px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: -0.04em;
  }
`;

const SignUpCard = () => {
  const theme = useTheme();
  return (
    <StyledGrid
      container
      height="100%"
      sx={{
        background: `linear-gradient(45deg, ${gradientColors.c1}, ${gradientColors.c2})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        paddingX={7}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Box
          display="flex"
          justifyContent={{ xs: "center", lg: "flex-start" }}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Avatar alt="star" src="/Stars.svg" />
        </Box>

        <StyledTypography1
          color="#E4E7EC"
          textAlign={{ xs: "center", md: "start" }}
        >
          {infoObj.h1}
        </StyledTypography1>
        <Typography
          variant="body1"
          gutterBottom
          textAlign={{ xs: "center", md: "start" }}
          color="#F6F5F5"
          paddingX={{ sm: 5, md: 0 }}
          sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px" }}
        >
          {infoObj.h2}
        </Typography>
        <Typography
          variant="body1"
          color="#F8F7F7"
          textAlign={{ xs: "center", md: "start" }}
          sx={{ fontWeight: "600", fontSize: "19px", lineHeight: "23px" }}
        >
          {infoObj.h3}
        </Typography>

        <Grid
          container
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-start" },
            alignItems: "center",
            height: "56px",
          }}
        >
          <Grid item>
            <Stack direction="row" sx={{ position: "relative" }}>
              <Avatar
                alt="Avatar 1"
                src="/person3.jpg"
                sx={{ width: 40, height: 40, zIndex: 1 }}
              />
              <Avatar
                alt="Avatar 2"
                src="/person2.jpg"
                sx={{
                  width: 40,
                  height: 40,
                  position: "absolute",
                  left: 25,
                  zIndex: 2,
                }}
              />
              <Avatar
                alt="Avatar 3"
                src="/person1.jpg"
                sx={{
                  width: 40,
                  height: 40,
                  position: "absolute",
                  left: 55,
                  zIndex: 2,
                }}
              />
              
            </Stack>
          </Grid>
          <Grid item sx={{ pl: 8.5 }}>
            <Typography
              color="#F6F5F5"
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "17px",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                  lineHeight: "15px",
                },
              }}
            >
              {`Join ${infoObj.users} users`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default SignUpCard;
