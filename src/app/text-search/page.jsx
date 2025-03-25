"use client"
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Divider, Typography, Grid, Box, Container, IconButton } from "@mui/material";
import SearchCompanyInfo from "../../components/Cards/SearchCompanyInfo";
import { useSearchParams } from "next/navigation";
import { colors } from "@/components/Constants/colors";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Spinner from "../../components/Common/Spinner";

const StyledTypography1 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
  white-space:nowrap;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;

const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const TextSearch = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [isLoading,setIsLoading]=useState(true)
  
  const isXsOrSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    getCompanies(q);

    return () => {
      setCompanies([]);
    };
  }, [q]);

  const getCompanies = async (query) => {
    const res = await fetch(
      `https://api.sovrenn.com/company/full-text-search?q=${query}`
    );

    const data = await res.json();

    if (res.ok) {
      setIsLoading(false)
      setCompanies(data.companies);
    }
    return;
  };

  if (isLoading ) {
    return (
      <>
        <Head>
          <title>Search for companies</title>
         
        </Head>
        <Spinner margin={15} />
      </>
    );
  }

  if (!companies?.length) {
    return (
      <>
        <Head>
          <title>Search for companies</title>
        </Head>
        <Container>
          <Box marginTop="90px">
           
            <StyledTypography1
              color={colors.navyBlue500}
              marginRight={1}
              component="span"
            >
              {"Search Result for"+" "+":"}
            </StyledTypography1>
            <StyledTypography1 color={colors.themeGreen} component="span">
              {q}
            </StyledTypography1>

            <CustomDivider sx={{ mt: "10px", mb: "15px" }} />

            <div>
              <StyledTypography2
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
                No result found
              </StyledTypography2>
            </div>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Result for the searched text</title>
      </Head>
      <Container>
        <Box marginY="90px" >
          {isXsOrSm && (
            <IconButton onClick={() => router.back()} aria-label="go back">
              <ArrowBack sx={{fontSize: 28,}}/>
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

          <CustomDivider sx={{ mt: "10px" }} />

          <div>
            <SearchCompanyInfo content={companies} textSearch="textSearch" />
          </div>
        </Box>
      </Container>
    </>
  );
};

export default TextSearch;