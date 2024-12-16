"use client";
import React, { useEffect, useState } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Box,
  Grid,
  Container,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import Details from "../../components/Profile/Details";
import ProfileSettings from "../../components/Profile/ProfileSettings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "@/components/Constants/colors";
import { useTheme } from "@mui/material/styles";
import Footer from "@/components/Home/Footer";
import Snackbar from "../../components/Snackbar/SnackBar";
import { useDispatch } from "react-redux";
import { subscriptionDetailsApi } from "../Redux/Slices/authSlice";
import { useRouter } from "next/navigation";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const StyledToggleButton = styled(ToggleButton)`
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 16px;
  border: none;
  color: #1f2d3d;
  &.Mui-selected {
    color: #0fa958;
    background-color: #e0f7e4;
    font-weight: 600;
  }
  @media (max-width: 640px) {
    font-weight: 600;
  }
`;
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const Profile = () => {
  const [alignment, setAlignment] = useState("myDetails");
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  useEffect(() => {
    dispatch(subscriptionDetailsApi());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Container>
        <Grid container marginY="100px">
          <Snackbar />
          <Grid item>
            <Box marginBottom={1} display="flex" alignItems="center">
              {isSmallScreen && (
                <ArrowBackIcon
                  sx={{
                    fontSize: 28,
                    marginRight: { xs: 1, sm: 2 },
                    color: colors.navyBlue500,
                  }}
                />
              )}
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
                My
              </StyledTypography1>
              <StyledTypography1
                color={theme.palette.primary.main}
                component="span"
              >
                Profile
              </StyledTypography1>
            </Box>
            <StyledToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="profile settings"
              sx={{ marginTop: 2 }}
            >
              <StyledToggleButton value="myDetails" aria-label="my details">
                My details
              </StyledToggleButton>
              <StyledToggleButton
                value="accountSettings"
                aria-label="account settings"
              >
                Account Settings
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Grid>

          <Grid
            item
            width="100%"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {alignment === "myDetails" && <Details />}
            {alignment === "accountSettings" && <ProfileSettings />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
