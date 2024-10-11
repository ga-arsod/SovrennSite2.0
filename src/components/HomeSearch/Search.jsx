"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import SearchCompanyInfo from "../Cards/SearchCompanyInfo";
import CompanyCard from "../Cards/CompanyCard";
import SearchCompanyPulseAdd from "../Cards/SearchCompanyPulseAdd";
import convertToHTML from "@/utils/convertToHtml";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import styles from "../../styles/CompanyResult.module.css";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Spinner from "../Common/Spinner";

const StyledTypography1 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
 
   @media (max-width: 639px) {
    font-size: 19px;
    line-height: 17px;
   
  }
`;

const StyledTypography2 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
   @media (max-width: 639px) {
    font-size: 16px;
    line-height: 17px;
   
  }
`;

const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const Search = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [isLoading,setIsLoading]=useState(true)
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  
 
  const isXsOrSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    if (q) {
      getCompanies(q);
    }
    return () => {};
  }, [q]);

  const getCompanies = async (query) => {
    const res = await fetch(
      `https://api.sovrenn.com/company/text-search?q=${query}`
    );

    const data = await res.json();

    if (res.ok) {
      setIsLoading(false)

      setData(data.data);
    }
    return;
  };

  if (isLoading ) {
    return (
      <>
        <Head>
          <title>Search results for {q}</title>
         
        </Head>
        <Spinner margin={15} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Search results for {q}</title>
      </Head>
      <Grid container marginTop="60px" flexDirection="column" >
        <Grid item paddingY={{ xs: 2, sm: 5 }} sx={{display:"flex",alignItems:"center"}}>
        
          {isXsOrSm && (
            <IconButton onClick={() => router.back()} aria-label="go back">
              <ArrowBackIcon sx={{color:colors.navyBlue500}} />
            </IconButton>
          )}

          <StyledTypography1
            color={colors.navyBlue500}
            marginRight={1}
            component="span"
          >
            Search Result for:
          </StyledTypography1>
          <StyledTypography1 color={colors.themeGreen} component="span">
            {q}
          </StyledTypography1>
        </Grid>
        <Grid item marginBottom={3}>
          <StyledTypography2 color={colors.red400} textAlign="center">
            {` ${q} is not covered by Sovrenn.`}
          </StyledTypography2>
        </Grid>

        <Grid item>
          {data?.text ? (
            <div id={styles.infoText}>{convertToHTML(data?.text)}</div>
          ) : (
            ""
          )}
        </Grid>
        <Grid item paddingTop={4}>
          <CustomDivider sx={{ mt: 4, mb: 4 }} />
        </Grid>
        <Grid item>
          {data?.available_data?.data?.length ? (
            <>
              <StyledTypography1 color={colors.navyBlue400}>
                {data.available_data?.header}
              </StyledTypography1>
              <SearchCompanyInfo content={data?.available_data?.data} />
              <CustomDivider sx={{ mt: 4, mb: 4 }} />
            </>
          ) : (
            ""
          )}
        </Grid>
        {data?.discovery ? (
          <Grid item>
            <StyledTypography1 color={colors.navyBlue400}>
              {data?.discovery?.header}
            </StyledTypography1>
            <CompanyCard
              data={data?.discovery?.data ? [data.discovery.data] : []}
            />
            <CustomDivider sx={{ mt: 4, mb: 4 }} />
          </Grid>
        ) : (
          ""
        )}

        {data?.pulse?.data?.length ? (
          <Grid item marginBottom={6}>
            <StyledTypography1 color={colors.navyBlue400}>
              {data?.pulse?.header}
            </StyledTypography1>
            <SearchCompanyPulseAdd content={data?.pulse?.data} />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default Search;