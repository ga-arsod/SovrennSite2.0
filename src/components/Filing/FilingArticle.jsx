import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Container,
  Stack,
  Card,
  CardContent,
  Collapse,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { filingFilterApi, allFilingApi } from "@/app/Redux/Slices/filingSlice";
import Link from "next/link";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilingFilter from "../Filing/FilingFilter";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";



const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 33px;
  line-height: 40px;

  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 21px;
    line-height: 28px;
  }
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 500;
  font-size: 17px;
  line-height: 23px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.themeGreen};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.themeGreen};
`;


const StyledTypographyFileLink = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: ${colors.themeGreen};
`;

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


const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 4px 14px;
  border-radius: 80px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const FilingArticle = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { allFiling, pagination, isFilingFilterOpen } = useSelector(
    (store) => store.filing
  );
  const { isAuth } = useSelector((store) => store.auth);
  const [filterData, setFilterData] = useState({});
  const [page, setPage] = useState(1);
  const handleModalOpen = () => {
    setIsOpen(false);
  };

  const setPaginate = () => {
    setPage(page + 1);

    
      dispatch(
        allFilingApi({ text: "", page: page+1, pageSize: 20,data: filterData })
      );
    
  };
  useEffect(() => {
    dispatch(allFilingApi({ text: "", page: 1, pageSize: 20,data: filterData }));
  
    dispatch(filingFilterApi());
  }, [dispatch, isAuth]);
 
 
  return (
    <>
      <FilingFilter
        isOpen={isFilingFilterOpen}
        handleModalOpen={handleModalOpen}
        page={page}
        setPage={setPage}
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <Grid container direction="column" alignItems="center">
        {allFiling?.map((article, index) => {
          return (
            <Card
              variant="outlined"
              sx={{
                width: { xs: "100%", md: "100%" },
                marginTop: 3,
                padding: 1,
              }}
              key={index}
            >
              <CardContent>
                <Typography
                  color="#8A949C"
                  sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  {moment(article.news_date).format("Do MMM YYYY")} |{" "}
                  {moment(article.news_date).format("LT")}
                </Typography>

                <Box
                  display="flex"
                  justifyContent={{ xs: "flex-start", sm: "space-between" }}
                  alignItems="center"
                  mb={2}
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                >
                  <StyledTypography2 color={colors.navyBlue900}>
                    {article.company_name}
                  </StyledTypography2>

                  {!isSmallScreen && article?.file_url ? (
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", sm: "row" }}
                      justifyContent="flex-end"
                      gap={2}
                      width={{ xs: "100%", sm: "auto" }}
                      alignItems={{ xs: "flex-end" }}
                    >
                      <Grid container gap={2} marginTop={{ xs: 1, sm: 0 }}>
                        {article?.discovery_slug && (
                          <Link
                            href={`discovery/pulse/${article?.discovery_slug}`}
                            target="_blank"
                          >
                            <StyledButton
                              variant="outlined"
                              color="primary"
                              sx={{ textTransform: "none" }}
                            >
                              Read Discovery
                            </StyledButton>
                          </Link>
                        )}
                        {article?.prime_slug && (
                          <Link
                            href={`prime/${article?.prime_slug}`}
                            target="_blank"
                          >
                            <StyledButton
                              variant="outlined"
                              color="primary"
                              sx={{ textTransform: "none" }}
                            >
                              Read Prime
                            </StyledButton>
                          </Link>
                        )}
                      </Grid>

                      {article.file_url && (
                        <Link
                          href={article.file_url}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                            <StyledTypographyFileLink>
                              File Link
                            </StyledTypographyFileLink>
                          </FileLinkButton>
                        </Link>
                      )}
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>

                <Box mb={2}>
                  <StyledTypography3 sx={{ mt: 0.5 }}>
                    {article.ai_summary}
                  </StyledTypography3>
                </Box>

                {isSmallScreen && article?.file_url ? (
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="flex-start"
                    gap={2}
                    width="100%"
                  >
                    {article?.discovery_slug && (
                      <Link
                        href={`discovery/pulse/${article?.discovery_slug}`}
                        target="_blank"
                      >
                        <StyledButton
                          variant="outlined"
                          color="primary"
                          sx={{ textTransform: "none" }}
                        >
                          Read Discovery
                        </StyledButton>
                      </Link>
                    )}

                    {article?.prime_slug && (
                      <Link
                        href={`prime/${article?.prime_slug}`}
                        target="_blank"
                      >
                        <StyledButton
                          variant="outlined"
                          color="primary"
                          sx={{ textTransform: "none" }}
                        >
                          Read Prime
                        </StyledButton>
                      </Link>
                    )}

                    {article.file_url && (
                      <Link
                        href={article.file_url}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                          <StyledTypographyFileLink>
                            File Link
                          </StyledTypographyFileLink>
                        </FileLinkButton>
                      </Link>
                    )}
                  </Box>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
          );
        })}

        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          marginBottom={6}
          marginTop={2}
        >
          <StyledButton2
            variant="contained"
            endIcon={<ExpandMoreIcon style={{ fontSize: "24px" }} />}
            onClick={setPaginate}
          >
            Load More
          </StyledButton2>
        </Box>
      </Grid>
    </>
  );
};

export default FilingArticle;
