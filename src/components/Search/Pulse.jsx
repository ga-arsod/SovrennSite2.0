import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { styled } from "@mui/material/styles";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import Link from "next/link";
import { colors } from "../Constants/colors";

const FileLinkButton = styled(Button)`
  background-color: ${colors.green50};
  text-transform: none;
  color: ${colors.themeGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 6px 16px;
  min-width: 120px;
  &:hover {
    color: white;
    background-color: ${colors.themeButtonHover};
  }
`;
const StyledTypographyFileLink = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: ${colors.themeGreen};
`;
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const PulseCard = () => {
  return (
    <Box mb={5}>
      <StyledTypography1 color={colors.navyBlue500} my={2}>
        Pulse
      </StyledTypography1>

      <Card variant="outlined" sx={{ borderRadius: 2, px: 1, py: 1.5 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledTypography2 color={colors.navyBlue500}>
              9th Jan 2025, 7:32 PM
            </StyledTypography2>

            <Link href="" target="_blank" style={{ textDecoration: "none" }}>
              <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                <StyledTypographyFileLink>File Link</StyledTypographyFileLink>
              </FileLinkButton>
            </Link>
          </Box>

          <StyledTypography3 color={colors.neutral800} mt={2}>
            K.P. Energy Limited's Group CEO, Dr. Alok Das, and CFO, Mrs. Shabana
            Virender Bajari, will be guest speakers at the "BHARAT 3.0 -
            Emergence of Mega Trends" event on January 11, 2025, in Mumbai. They
            will discuss the offshore wind renewables sector, opportunities, and
            the company's strategies. The presentation will be interactive,
            including a Q&A session. Affan Faruk Patel, the Whole Time Director,
            issued the intimation as per SEBI regulations.
          </StyledTypography3>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PulseCard;
