"use client";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Grid, Typography, Container, Box, Button } from "@mui/material";
import { colors } from "../../components/Constants/colors";
import SearchTableData from "../../components/HomeSearch/SearchTableData";
import CompanyCard from "../../components/Cards/CompanyCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchPrimeCard from "../../components/Cards/SearchPrimeCard";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Spinner from "@/components/Common/Spinner";
import NoData from "../../components/NoData/NoData";
import Link from "next/link";


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

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  line-height: 19px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.navyBlue500};
  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
  }
`;

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
  && {
    font-size: 12px;
    color: ${colors.navyBlue500};
  }
`;

const CompanyInfo = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const handleNavigation = () => {
    const searchQuery = encodeURIComponent(companyData.company?.company_name || "");
    router.push(`/times?search=${searchQuery}`);
  };
  
  const [companyData, setCompanyData] = useState({
    company: {},
    news: [],
    prime: [],
    discovery: [],
    ipo: [],
    is_ipo_company: false,
  });
 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    company_name: "",
    sector: "",
    industry: "",
    one_month_return: 0,
    one_week_return: 0,
    price: 0,
  });

  useEffect(() => {
    getCompanyData(q);

    return () => {};
  }, [q]);

  const getCompanyData = async (q) => {
    const res = await fetch(
      `https://api.sovrenn.com/company/search/company-data/${q}`
    );

    const data = await res.json();

    if (res.ok) {
      setIsLoading(false);
      setCompanyData({
        company: data.company,
        news: data.news,
        prime: data.prime,
        discovery: data.discovery,
        ipo: data.ipo,
        is_ipo_company: data.is_ipo_company,
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{companyData.company.slug}</title>

          <link
            rel="canonical"
            href="https://www.sovrenn.com/company"
            key="canonical"
          />
        </Head>
        <Spinner margin={15} />
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>{companyData.company.company_name}</title>

        <link
          rel="canonical"
          href="https://www.sovrenn.com/company"
          key="canonical"
        />
      </Head>
      <Container>
        <Grid
          container
          marginTop={{ xs: "90px", sm: "100px" }}
          flexDirection="column"
        >
          <Grid item>
            <StyledTypography1 color={colors.navyBlue500}>
              {companyData.company.company_name}
            </StyledTypography1>
          </Grid>
          <Grid item marginTop={3}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              direction={{ xs: "column", sm: "row" }}
            >
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Prev Close: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {companyData.company.share_price}
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Sector: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {companyData.company.sector}
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Industry: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {companyData.company.industry}
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Market Cap: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {companyData.company.market_cap}
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`TTM PE: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
                  {companyData.company.ttm_pe}
                </StyledTypography3>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginTop={4} width="100%">
            <StyledTypography2>Prime Articles</StyledTypography2>
            {!companyData?.prime.length ? (
              <NoData text="No Prime article available." />
            ) : isSmallerThanMd ? (
              <SearchPrimeCard data={companyData?.prime} />
            ) : (
              <SearchTableData data={companyData?.prime} />
            )}
          </Grid>

          <Grid item width="100%" marginTop={2}>
            <StyledTypography2>Discovery</StyledTypography2>
            {!companyData?.discovery.length ? (
              <NoData text="No bucket available currently." />
            ) : (
              <CompanyCard
                data={companyData?.discovery}
                slug={companyData?.company?.slug}
              />
            )}
          </Grid>

          <Grid item marginTop={4} width="100%">
            <StyledTypography2>Times</StyledTypography2>
            {!companyData?.news.length ? (
              <NoData text="No Times article available." />
            ) : (
              <Box
                sx={{
                  paddingX: 2,
                  marginY: 3,
                  border: `1px solid ${colors.neutral600}`,
                  borderRadius: 1,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  direction={isSmallerThanSm ? "column" : "row"}
                  paddingY={2}
                >
                  <Grid item xs>
                    <StyledTypography3
                      sx={{ color: colors.navyBlue500, fontWeight: "600" }}
                    >
                      {`Read the ${companyData.news.length} latest news related to ${companyData.company?.company_name}.`}
                    </StyledTypography3>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                   
                      <StyledButton
                        variant="outlined"
                        endIcon={<StyledArrowForwardIosIcon />}
                        size="small"
                        onClick={handleNavigation}
                      >
                        Read
                      </StyledButton>
                    
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CompanyInfo;
