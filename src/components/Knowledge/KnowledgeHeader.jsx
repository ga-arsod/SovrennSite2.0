"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button, Container } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  letter-spacing: 0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0.02em;
  }
`;
const StyledButton = styled(Button)`
  color: ${colors.navyBlue500};
  background-color: transparent;
  text-transform: none;
  border: 1px solid ${colors.navyBlue500};
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 12px;
  padding-bottom: 12px;
  white-space: nowrap;
  :hover {
    background-color: ${colors.white};
  }
`;

const KnowledgeHeader = () => {
  const theme = useTheme();
  return (
    <Container>
      <Box sx={{ marginTop: "54px" }} marginBottom={{ xs: 3, sm: "28px" }}>
        <Grid container alignItems="center">
          <Grid item paddingTop={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1}>
              <Box display="flex" alignItems="center">
                <Box
                  display={{ xs: "block", sm: "block", md: "none" }}
                  marginRight={1}
                >
                  <ArrowBackIcon
                    sx={{ fontSize: 28, }}
                  />
                </Box>
                <StyledTypography1
                  color={colors.navyBlue500}
                  marginRight={1}
                  component="span"
                >
                  Sovrenn
                </StyledTypography1>
                <StyledTypography1
                  color={theme.palette.primary.main}
                  component="span"
                >
                  Knowledge
                </StyledTypography1>
              </Box>
              <StyledTypography2 color={colors.navyBlue400}>
                Explore our article that enables you to gain more knowledge
                about the finance world.
              </StyledTypography2>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default KnowledgeHeader;
