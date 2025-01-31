"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";

export default function InvestingKnowledge() {
  const StyledTypography1 = styled(Typography)`
    font-size: 48px;
    font-weight: 600;
    line-height: 56px;
    letter-spacing: -0.04em;
    @media (max-width: 639px) {
      font-size: 26px;
      line-height: 28px;
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
  return (
    <Box sx={{ p: 4 }} marginTop="60px">
      <StyledTypography1 color={colors.navyBlue500}>
        Test Your{" "}
        <span style={{ color: colors.themeGreen }}>Investing Knowledge</span>
      </StyledTypography1>

      <Grid container spacing={3} marginTop={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: "238px",
              boxShadow: "none",
              border: "1px solid #E4E7EC",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <StyledTypography2 color="#20385E">
                Sovrenn Exam
              </StyledTypography2>
              <StyledTypography3 color="#96A7B4" mt={1}>
                Test Your Basic Investing Knowledge, win real money and
                certificate
              </StyledTypography3>
              <StyledTypography3 color="#96A7B4" mt={1}>
                ⏳ 20 mins | 📋 20 Questions
              </StyledTypography3>
              <Button variant="contained" sx={{ mt: 2, width: "100%" }}>
                Start Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: "238px",
              boxShadow: "none",
              border: "1px solid #E4E7EC",
              borderRadius: "16px",
            }}
          >
            <CardContent>
            <StyledTypography2 color="#20385E">
                View Leaderboard
              </StyledTypography2>
              <StyledTypography3 color="#96A7B4" mt={1}>
                Check the leaderboard to see your ranking
              </StyledTypography3>
              <Button variant="contained" sx={{ mt: 2, width: "100%" }}>
                View Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" mt={4} gutterBottom>
        Your Certificates
      </Typography>

      <Grid container spacing={2}>
        {[1, 2].map((cert, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <PictureAsPdfIcon color="error" fontSize="large" sx={{ mr: 2 }} />
              <Typography sx={{ flexGrow: 1 }}>20-04-24_AdvanceExam</Typography>
              <Button color="primary">View</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
