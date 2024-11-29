import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePulseFilter,
  pulseArticlesApi,
  pulseFilteredArticlesApi,
} from "@/app/Redux/Slices/pulseSlice";
import PulseFilter from "../../components/Pulse/PulseFilter";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    line-height: 28px;
  }
`;

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
  padding: 6px 16px;
  text-transform: none;
  border-color: ${colors.themeGreen};
 
`;
const StyledButton3 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #1C1C1C;
  padding: 6px 16px;
  text-transform: none;
  border-color:#1C1C1C;
  &:hover {
   border-color:#1C1C1C;
   
  }
 
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

const HeaderBox = styled(Box)`
  background-color: #f6f5f5;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
  padding: 12px;
`;

const StyledTypography4 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
  @media (max-width: 639px) {
    font-size: 23px;
    line-height: 28px;
  }
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 8px 24px;

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

const PulseArticle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { pulseArticleData, pagination, isPulseFilterOpen } = useSelector(
    (store) => store.pulse
  );
  const [expanded, setExpanded] = useState({});
  const [filterData, setFilterData] = useState({});
  const [windowSize, setWindowSize] = useState(undefined);

  useEffect(() => {
    dispatch(pulseArticlesApi({ page: 1, pageSize: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const initialExpandedState = pulseArticleData?.reduce((acc, article) => {
      const date = moment(article?.news_date).format("Do MMM YYYY");
      acc[date] = true;
      return acc;
    }, {});
    setExpanded(initialExpandedState || {});
  }, [pulseArticleData]);

  const handleToggle = (date) => {
    setExpanded((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const setPaginate = () => {
    setPage(page + 1);

    if (Object.entries(filterData).length)
      dispatch(
        pulseFilteredArticlesApi({
          page: page + 1,
          pageSize: 20,
          filters: filterData,
        })
      );
    else dispatch(pulseArticlesApi({ page: page + 1, pageSize: 20 }));
  };
  const handleModalOpen = () => {
    setIsOpen(false);
  };
  const groupedByDate = pulseArticleData?.reduce((acc, article) => {
    const date = moment(article?.news_date).format("Do MMM YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(article);
    return acc;
  }, {});

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerWidth > 920);
    }

    handleWindowResize();
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "p" || event.key === "P")) {
        event.preventDefault();
      }
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      <PulseFilter
        isOpen={isPulseFilterOpen}
        handleModalOpen={handleModalOpen}
        page={page}
        setPage={setPage}
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <Box sx={{ marginTop: "54px" }} marginBottom={{ xs: 3, sm: "28px" }}>
        <Grid container alignItems="center">
          <Grid item paddingY={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1}>
              <Box display="flex" alignItems="center">
                <Box
                  display={{ xs: "block", sm: "block", md: "none" }}
                  marginRight={1}
                >
                  <ArrowBackIcon
                    sx={{ fontSize: { xs: "14px", sm: "24px" } }}
                  />
                </Box>
                <StyledTypography1
                  color={colors.navyBlue500}
                  marginRight={1}
                  component="span"
                >
                  My
                </StyledTypography1>
                <StyledTypography1
                  color={theme.palette.primary.main}
                  component="span"
                >
                  Portfolio
                </StyledTypography1>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <StyledButton3
              variant="outlined"
              endIcon={
                <FilterAltOutlinedIcon
                  sx={{ fontSize: "16px", color: colors.navyBlue500 }}
                />
              }
              size="small"
              onClick={() => dispatch(togglePulseFilter())}
            >
              Filter
            </StyledButton3>
            <Typography></Typography>

            <Link href="/pulse/portfolio">
              <StyledButton3
                variant="outlined"
                endIcon={
                  <DriveFileRenameOutlineIcon
                    sx={{ fontSize: "16px", color: colors.navyBlue500 }}
                  />
                }
                size="small"
                
              >
                Edit Portfolio
              </StyledButton3>
            </Link>
          </Grid>
        </Grid>
      </Box>

      {groupedByDate &&
        Object.entries(groupedByDate).map(([date, articles]) => (
          <React.Fragment key={date}>
            <HeaderBox onClick={() => handleToggle(date)}>
              <Grid
                container
                justifyContent="space-between"
                paddingY={0}
                paddingX="12px"
                alignItems="center"
              >
                <Grid item>
                  <StyledTypography4>{date}</StyledTypography4>
                </Grid>
                {/* <Grid item>
                  <IconButton size="small">
                    <ExpandMoreIcon
                      sx={{
                        transform: expanded[date]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </IconButton>
                </Grid> */}
              </Grid>
            </HeaderBox>

            <Collapse in={expanded[date]} timeout="auto" unmountOnExit>
              {articles?.map((article) => (
                <Card
                  key={article.company_name}
                  variant="outlined"
                  sx={{ width: "100%", marginBottom: 2, padding: 1 }}
                >
                  <CardContent>
                    <Typography color="#8A949C" sx={{fontWeight:'600',fontSize:'12px',lineHeight:'14px'}}>{moment(article.news_date).format("Do MMM YYYY")} | {moment(article.news_date).format('LT')}</Typography>
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

                      {article?.file_url && (
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          gap={2}
                          width={{ xs: "100%", sm: "auto" }}

                        >
                          {
                            article?.discovery_slug && 
                            <Link
                          href={`discovery/pulse/${article.discovery_slug}`}
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
                          }
                          
                   
                     {
                      article.prime_slug && 
                      <Link
                      href={`prime/pulse/${article.prime_slug}`}
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

                     }
                       
                       {
                        article.file_url && 
                        <Link
                        href={article.file_url}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <FileLinkButton
                          startIcon={<AttachFileTwoToneIcon />}
                        >
                          <StyledTypographyFileLink>
                            File Link
                          </StyledTypographyFileLink>
                        </FileLinkButton>
                      </Link>
                       }
                         
                        </Box>
                      )}
                    </Box>

                    <Box mb={2}>
                      <StyledTypography3 sx={{ mt: 0.5 }}>
                        {article.ai_summary}
                      </StyledTypography3>
                    </Box>

                    <Stack direction="row" spacing={2}>
                     
                        
                     
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Collapse>
          </React.Fragment>
        ))}

      {pagination?.total_pages === pagination?.page ||
      !pulseArticleData.length ? (
        ""
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          marginBottom={6}
          onClick={setPaginate}
        >
          <StyledButton2 variant="contained">Load More</StyledButton2>
        </Box>
      )}
    </>
  );
};

export default PulseArticle;
