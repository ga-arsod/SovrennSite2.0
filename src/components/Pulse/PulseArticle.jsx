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
} from "@/app/Redux/Slices/pulseSlice";

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
  border-radius: 8px;
  padding: 4px 16px;
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

const PulseArticle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { pulseArticleData } = useSelector((store) => store.pulse);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    dispatch(pulseArticlesApi({ page: 1, pageSize: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const initialExpandedState = pulseArticleData?.reduce((acc, article) => {
      const date = moment(article.news_date).format("Do MMM YYYY");
      acc[date] = true;
      return acc;
    }, {});
    setExpanded(initialExpandedState);
  }, [pulseArticleData]);

  const handleToggle = (date) => {
    setExpanded((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const groupedByDate = pulseArticleData?.reduce((acc, article) => {
    const date = moment(article.news_date).format("Do MMM YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(article);
    return acc;
  }, {});

  return (
    <Container>
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
            {/* <StyledButton
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
            </StyledButton> */}
            <Typography></Typography>

            <Link href="/pulse/portfolio">
              <StyledButton
                variant="outlined"
                endIcon={
                  <DriveFileRenameOutlineIcon
                    sx={{ fontSize: "16px", color: colors.navyBlue500 }}
                  />
                }
                size="small"
              >
                Edit Portfolio
              </StyledButton>
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
                <Grid item>
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
                </Grid>
              </Grid>
            </HeaderBox>

            <Collapse in={expanded[date]} timeout="auto" unmountOnExit>
              {articles.map((article) => (
                <Card
                  key={article.company_name}
                  variant="outlined"
                  sx={{ width: "100%", marginBottom: 2, padding: 1 }}
                >
                  <CardContent>
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
                          width={{ xs: "100%", sm: "auto" }}
                        >
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
                        </Box>
                      )}
                    </Box>

                    <Box mb={2}>
                      <StyledTypography3 sx={{ mt: 0.5 }}>
                        {article.ai_summary}
                      </StyledTypography3>
                    </Box>

                    <Stack direction="row" spacing={2}>
                      {article.discovery_slug && (
                        <Link
                          href={`discovery/pulse/${article.discovery_slug}`}
                          target="_blank"
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ textTransform: "none" }}
                          >
                            Discovery
                          </Button>
                        </Link>
                      )}
                      {article.prime_slug && (
                        <Link
                          href={`prime/pulse/${article.prime_slug}`}
                          target="_blank"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: "none" }}
                          >
                            Prime
                          </Button>
                        </Link>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Collapse>
          </React.Fragment>
        ))}
    </Container>
  );
};

export default PulseArticle;