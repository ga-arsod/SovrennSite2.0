// "use client"
// import Head from "next/head";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import styled from "@emotion/styled";
// import { Divider, Typography, Grid, Box, Container, IconButton } from "@mui/material";
// import SearchCompanyInfo from "../../components/Cards/SearchCompanyInfo";
// import { useSearchParams } from "next/navigation";
// import { colors } from "@/components/Constants/colors";
// import ArrowBack from "@mui/icons-material/ArrowBack";
// import { useMediaQuery } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Spinner from "../../components/Common/Spinner";

// const StyledTypography1 = styled(Typography)`
//   font-size: 23px;
//   font-weight: 600;
//   line-height: 28px;
//   letter-spacing: -0.02em;
//   white-space:nowrap;
// `;

// const StyledTypography2 = styled(Typography)`
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 19px;
// `;

// const CustomDivider = styled(Divider)`
//   background-color: ${colors.neutral500};
//   border-color: none;
//   border-bottom-width: 0px;
//   height: 2px;
// `;

// const TextSearch = () => {
//   const router = useRouter();
//   const [companies, setCompanies] = useState([]);
//   const searchParams = useSearchParams();
//   const q = searchParams.get("q");
//   const [isLoading,setIsLoading]=useState(true)
  
//   const isXsOrSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

//   useEffect(() => {
//     getCompanies(q);

//     return () => {
//       setCompanies([]);
//     };
//   }, [q]);

//   const getCompanies = async (query) => {
//     const res = await fetch(
//       `https://api.sovrenn.com/company/full-text-search?q=${query}`
//     );

//     const data = await res.json();

//     if (res.ok ) {
//       setIsLoading(false)
//       setCompanies(Array.isArray(data.companies) ? data.companies : []);
//     }
//     else {
//       setCompanies([]); 
//     }
//     return;
//   };

//   if (isLoading ) {
//     return (
//       <>
//         <Head>
//           <title>Search for companies</title>
         
//         </Head>
//         <Spinner margin={15} />
//       </>
//     );
//   }

//   if (!companies?.length) {
//     return (
//       <>
//         <Head>
//           <title>Search for companies</title>
//         </Head>
//         <Container>
//           <Box marginTop="90px">
           
//             <StyledTypography1
//               color={colors.navyBlue500}
//               marginRight={1}
//               component="span"
//             >
//               {"Search Result for"+" "+":"}
//             </StyledTypography1>
//             <StyledTypography1 color={colors.themeGreen} component="span">
//               {q}
//             </StyledTypography1>

//             <CustomDivider sx={{ mt: "10px", mb: "15px" }} />

//             <div>
//               <StyledTypography2
//                 color={colors.navyBlue500}
//                 marginRight={1}
//                 component="span"
//               >
//                 No result found
//               </StyledTypography2>
//             </div>
//           </Box>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Result for the searched text</title>
//       </Head>
//       <Container>
//         <Box marginY="90px" >
//           {isXsOrSm && (
//             <IconButton onClick={() => router.back()} aria-label="go back">
//               <ArrowBack sx={{fontSize: 28,}}/>
//             </IconButton>
//           )}
//           <StyledTypography1
//             color={colors.navyBlue500}
//             marginRight={1}
//             component="span"
//           >
//             Search Result for:
//           </StyledTypography1>
//           <StyledTypography1 color={colors.themeGreen} component="span">
//             {q}
//           </StyledTypography1>

//           <CustomDivider sx={{ mt: "10px" }} />

//           <div>
//             <SearchCompanyInfo content={companies} textSearch="textSearch" />
//           </div>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default TextSearch;
"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../../components/Constants/colors";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import EmptySearch from "../../components/Search/EmptySearch";
import Link from "next/link";
import { useEffect } from "react";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;

  @media (max-width: 639px) {
    font-size: 19px;
    line-height: 23px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  @media (max-width: 639px) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const StyledButton2 = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  background-color: #e6f6f2;
  text-transform: none;
  border-radius: 4px;

  :hover {
    background-color: #e6f6f2;
  }
`;

const stripHtmlTags = (text) => {
    text = text
      .replaceAll("&nbsp;", " ")
      .replaceAll("&amp;", "&")
      .replaceAll(/<\/?[^>]+(>|$)/g, "");
  
    return text;
  };

const SearchResults = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const { textSearchData } = useSelector((store) => store.search);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
      if (typeof window !== "undefined") {
        document.title = `Search for companies`;
        const link = document.querySelector("link[rel='canonical']");
        if (link) {
          link.href = `https://www.sovrenn.com/filing`;
        }
      }
    }, []);

  const highlightText = (text, keyword) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span
          key={index}
          style={{ color: colors.themeGreen, fontWeight: "bold" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!textSearchData?.length) return <EmptySearch />;

  return (
    <Container>
      <Box marginTop="90px" mb={5}>
        <StyledTypography1 color={colors.navyBlue500} mb={1}>
          Search Result for:{" "}
          <span style={{ color: colors.themeGreen }}>{q}</span>
        </StyledTypography1>

        <StyledTypography1 mt={4} mb={2}>
          Keyword Found in
        </StyledTypography1>

        <Grid container spacing={2}>
          {textSearchData?.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                elevation={0}
                sx={{
                  border: "1px solid #DEDDDD",
                  borderRadius: "8px",
                  height:{xs:"auto",md:"220px"},
                }}
              >
                <CardContent sx={{ position: "relative", pb: 4 }}>
                  {!isXs ? (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <StyledTypography2 color={colors.navyBlue500}>
                        {item?.company_name}
                      </StyledTypography2>
                       <Link target="_blank" href={`/discovery/data/${item?.data?.params?.slug}`}>
                      <StyledButton2 variant="contained" size="small">
                        Read Free
                      </StyledButton2>
                      </Link>
                    </Box>
                  ) : (
                    <StyledTypography2 color={colors.navyBlue500} mb={1}>
                      {item?.company_name}
                    </StyledTypography2>
                  )}

                  <StyledTypography3 color={colors.neutral800} mt={2}>
                    {highlightText(stripHtmlTags(item?.sentence,q))}
                  </StyledTypography3>

                  {isXs && (
                    <Box mt={2}>
                         <Link target="_blank" href={`/discovery/data/${item?.data?.params?.slug}`}>
                      <StyledButton2 variant="contained" size="small">
                        Read Free
                      </StyledButton2>
                      </Link>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchResults;
