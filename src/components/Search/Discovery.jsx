import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid, Chip, useMediaQuery, useTheme
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import styles from "../../styles/searchDiscovery.module.css";
import convertToHtml from "@/utils/convertToHtml";
import Link from "next/link";
import styles2 from "../../styles/CompanyResult.module.css";
import CompanyCard from "../Cards/CompanyCard";
import { useSelector } from "react-redux";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledButton = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: #e6f6f2;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;
const StyledTypography2 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;

  @media (max-width: 639px) {
    font-size: 19px;
    line-height: 17px;
  }
`;

const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.02em;
  white-space: nowrap;
`;


const StyledChip = styled(Chip)`
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  color: ${colors.greyBlue400};
  transition: background-color 0.3s ease;
  font-family: Inter, sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #034635;
    color: white;
  }
`;
const Discovery = ({ data }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const company_summary = useSelector((store) => store.search.companySummary);

  return (
    <Box mt={2} mb={2}>
      <StyledTypography1 color={colors.navyBlue500}>
        Discovery
      </StyledTypography1>

      <Card elevation={0} sx={{ border: "1px solid #E0E0E0", borderRadius: 2, mt: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledTypography1 color={colors.navyBlue500} sx={{ fontWeight: "700" }}>
              {data?.company_name}
            </StyledTypography1>

      {!isXs && company_summary?.has_covered && (
        <Link href={`/discovery/${data?.discovery_buckets[0]?.slug}/${data?.slug}`} target="_blank">
          <StyledButton variant="contained">Read More</StyledButton>
        </Link>
      )}
    </Box>

          <Box>
            {company_summary?.has_covered && data ? (
              <div id={styles.MainContainer}>
                {convertToHtml(data?.discovery_content)}
              </div>
            ) : (
              !company_summary?.has_covered && data && (
                <div id={styles2.infoText}>
                  {convertToHtml(data?.discovery_content)}
                </div>
              )
            )}
          </Box>

    {isXs && company_summary?.has_covered && (
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Link href={`/discovery/${data?.discovery_buckets[0]?.slug}/${data?.slug}`} target="_blank">
          <StyledButton variant="contained" >
            Read More
          </StyledButton>
        </Link>
      </Box>
    )}
  </CardContent>
</Card>

      {
        data?.discovery_buckets?.length && company_summary?.has_covered ? <Box sx={{ mb: 2, mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,

              flexWrap: "wrap",
            }}
          >
            <StyledTypography3
              color={colors.greyBlue500}
              sx={{ marginRight: 1, whiteSpace: "nowrap" }}
            >
              Also present in buckets:
            </StyledTypography3>
            {data?.discovery_buckets?.map((item, index) => {
              return (
                <>
                  <Link href={`/discovery/${item?.slug}`} key={index}>
                    <StyledChip
                      label={item?.title}
                      variant="outlined"
                      key={index}
                    />
                  </Link>
                </>
              );
            })}
          </Box>


        </Box> : <></>
      }

      {data &&
        data?.discovery_buckets?.length &&
        !company_summary?.has_covered ? (
        <Grid container mt={2}>
          <Grid item>
            <StyledTypography1 color={colors.navyBlue400}>
              Explore High Profit Growth Companies in Discovery
            </StyledTypography1>
            <CompanyCard data={data?.discovery_buckets} />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Discovery;
