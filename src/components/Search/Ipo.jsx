import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import moment from "moment";
import styles from "../../styles/searchipo.module.css";
import convertToHtml from "@/utils/convertToHtml";
import Link from "next/link";
import { useSelector } from "react-redux";

const StyledButton2 = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: white;
  border: 1px solid ${colors.themeGreen};

  :hover {
    background-color: white;
    color: ${colors.themeGreen};
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
`;

const IpoCard = ({ data }) => {
  const company_summary = useSelector((store) => store.search.companySummary);
  console.log(data,"data")
  return (
    <Box>
      <StyledTypography2 color={colors.navyBlue500} my={2}>
        IPO
      </StyledTypography2>

      <Card variant="outlined" sx={{ borderRadius: 2, px: 1, py: 1.5, mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box display="flex" alignItems="center" justifyContent={{xs:"space-between",sm:"flex-start"}} gap={1}>
                <StyledTypography1 color={colors.themeGreen}>
                  Industry
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                {company_summary?.industry}
                </StyledTypography1>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box display="flex" alignItems="center"  justifyContent={{xs:"space-between",sm:"flex-start"}} gap={1}>
                <StyledTypography1 color={colors.themeGreen}>
                  Listing Date
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  {moment(data?.listing_date).format("Do MMM YYYY")}
                </StyledTypography1>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box display="flex" alignItems="center" justifyContent={{xs:"space-between",sm:"flex-start"}} gap={1}>
                <StyledTypography1 color={colors.themeGreen}>
                  Open Date
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  {moment(data?.opening_date).format("Do MMM YYYY")}
                </StyledTypography1>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box display="flex" alignItems="center" justifyContent={{xs:"space-between",sm:"flex-start"}} gap={1}>
                <StyledTypography1 color={colors.themeGreen}>
                  Offer Price PE
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  {data?.offer_price_ttm_pe}
                </StyledTypography1>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box display="flex" alignItems="center" justifyContent={{xs:"space-between",sm:"flex-start"}} gap={1}>
                <StyledTypography1 color={colors.themeGreen}>
                  Closing Date
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                {moment(data?.closing_date).format("Do MMM YYYY")}
                </StyledTypography1>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box display="flex" alignItems="center" justifyContent={{xs:"space-between",sm:"flex-start"}} gap={1}>
                <StyledTypography1 color={colors.themeGreen}>
                  LY Sales Growth
                </StyledTypography1>
                <StyledTypography1 color={colors.neutral900}>
                  {data?.revenue_growth}
                </StyledTypography1>
              </Box>
            </Grid>
          </Grid>

          <Box mt={2}>
            {data ? (
              <div id={styles.MainContainer}>{convertToHtml(data?.content)}</div>
            ) : null}
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Link href={`/ipo-zone/${data?.slug}`} passHref target="_blank">
              <StyledButton2
                variant="outlined"
                size="small"
                endIcon={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                  </Box>
                }
              >
                Read Full Article
              </StyledButton2>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IpoCard;
