"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Alert,
  Container,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { debounce, throttle } from "lodash";

import { useDispatch, useSelector } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getPortfolioCompanies,
  searchAllCompanies,
  clearAllCompanies,
  updatePortfolioApi,
} from "../../Redux/Slices/pulseSlice";
import { setSnackStatus } from "../../Redux/Slices/snackbarSlice";
import { colors } from "@/components/Constants/colors";
import Snackbar from "../../../components/Snackbar/SnackBar";
import NoLogin from "../../../components/Auth/NoLogin";

const StyledTypography = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`;
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: -0.04em;

  @media (max-width: 639px) {
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  letter-spacing: 0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0.02em;
  }
`;
const CustomListItem = styled(ListItem)`
  && {
    border-bottom: 1px solid #98a3b4;
    padding: 16px;
  }
`;

const StyledButton = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  text-transform: none;

  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const THROTTLE_DELAY = 500;
const DEBOUNCE_DELAY = 300;

const PulseSearch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { portfolioCompanies, isCompaniesLoading, allCompanies } = useSelector(
    (store) => store.pulse
  );

  const { isAuth } = useSelector((store) => store.auth);
  const [companies, setCompanies] = useState([]);
  const [companyIds, setCompanyIds] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(clearAllCompanies());
    dispatch(getPortfolioCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (portfolioCompanies) {
      setCompanies([...portfolioCompanies]);
      setCompanyIds(portfolioCompanies.map((element) => element._id));
    }
  }, [portfolioCompanies]);

  const throttledSearch = useCallback(
    throttle((text) => {
      dispatch(searchAllCompanies(text));
    }, THROTTLE_DELAY),
    [dispatch]
  );

  const debouncedSearch = useCallback(
    debounce((text) => {
      if (text.trim()) {
        throttledSearch(text);
      }
    }, DEBOUNCE_DELAY),
    [throttledSearch]
  );

  useEffect(() => {
    if (searchText.trim()) {
      debouncedSearch(searchText);
    }
  }, [searchText, debouncedSearch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Sovrenn Pulse - Portfolio";
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/pulse/portfolio`;
      }
    }
  }, []);
  const removeCompanyFromPortfolio = (value, index) => {
    const updatedCompanies = [...companies];
    const updatedCompanyIds = [...companyIds];

    updatedCompanies.splice(index, 1);
    updatedCompanyIds.splice(index, 1);

    setCompanies(updatedCompanies);
    setCompanyIds(updatedCompanyIds);
  };

  const removeCompanyFromRecentlyAdded = (value, index) => {
    let arr = [...recentlyAdded];

    arr.splice(index, 1);

    setRecentlyAdded(arr);
  };
  const addToRecentlyAdded = (value) => {
    // Check if the company is already in the recently added list
    if (recentlyAdded.some((company) => company._id === value._id)) {
      dispatch(
        setSnackStatus({
          status: true,
          message: "Company already added to the recently added list",
          severity: "error",
        })
      );
      return;
    }

    // Add the company to the recently added list
    setRecentlyAdded([...recentlyAdded, value]);
  };

  const updatePortfolio = () => {
    dispatch(
      updatePortfolioApi({ data: [...recentlyAdded, ...companies], router })
    );

    dispatch(
      setSnackStatus({
        status: true,
        message: "Portfolio has been updated",
        severity: "success",
      })
    );

    setRecentlyAdded([]);
  };
  const handleClear = () => {
    setSearchText("");
    dispatch(clearAllCompanies());
  };

  if (!isAuth) {
    return <NoLogin />;
  }

  return (
    <>
      <Container sx={{ paddingBottom: "80px" }}>
        <Snackbar />
        <Grid container marginTop="90px">
          <Grid item>
            <Box display="flex" alignItems="center">
              <ArrowBackIcon
                onClick={handleBackClick}
                sx={{
                  display: {
                    xs: "block",
                    sm: "block",
                    md: "none",
                    fontSize: 28,
                  },
                  mr: 1,
                }}
              />
              <StyledTypography1 color={colors.navyBlue500}>
                My <span style={{ color: colors.themeGreen }}>Portfolio</span>
              </StyledTypography1>
            </Box>

            <StyledTypography2 color={colors.navyBlue300} mt={1}>
              Receive refined updates for the stocks in your portfolio
            </StyledTypography2>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" marginTop={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              width: "100%",
              maxWidth: "520px",
            }}
          >
            <Snackbar />
            <div style={{ width: "100%" }}>
              <Grid item marginBottom="4px">
                <StyledTypography color={colors.navyBlue800}>
                  Search for a Company Name
                </StyledTypography>
              </Grid>
              <Grid item width="100%">
                <TextField
                  fullWidth
                  InputProps={{
                    borderColor: "transparent",

                    placeholder: "E.g. Aditya Vision",
                    sx: {
                      height: "52px",
                      padding: "0 5px",
                      borderColor: "#96A7B4",
                    },
                    endAdornment: searchText && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClear}>
                          <CloseIcon sx={{ color: "#96A7B4" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(ele) => setSearchText(ele.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: "10px 6px",
                      color: "#1C1C1C",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "21px",

                      "&::placeholder": {
                        color: "#96A7B4",
                        fontWeight: 400,
                        fontSize: "18px",
                        lineHeight: "21px",
                        opacity: 1,
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#98A3B4",
                      },
                    },
                  }}
                />
              </Grid>

              {allCompanies?.length ? (
                <div>
                  <Grid item marginTop="4px">
                    <List
                      sx={{
                        width: "100%",
                        border: "1px solid #98A3B4",
                        borderRadius: "4px",
                        padding: 0,
                      }}
                    >
                      {allCompanies?.map((value, index) => (
                        <CustomListItem
                          key={value._id}
                          disableGutters
                          sx={{
                            "&:hover": {
                              backgroundColor: "#E9EBEF",
                              "& svg path": {
                                fill: "#20385E",
                              },
                            },
                            cursor: "pointer",
                            borderBottom: "1px solid #98A3B4",
                            marginBottom: "0px",
                            height: "52px",
                            paddingLeft: "12px",
                            ...(index === allCompanies.length - 1 && {
                              borderBottom: "none",
                              marginBottom: 0,
                            }),
                          }}
                          onClick={() => addToRecentlyAdded(value)}
                        >
                          <ListItemText
                            primary={value.name}
                            primaryTypographyProps={{
                              style: { color: "black" },
                            }}
                          />
                          <IconButton
                            sx={{ "& svg path": { fill: "#BAC1CC" } }}
                          >
                            <AddIcon />
                          </IconButton>
                        </CustomListItem>
                      ))}
                    </List>
                  </Grid>
                </div>
              ) : (
                ""
              )}

              {recentlyAdded?.length ? (
                <div>
                  <Grid
                    container
                    display="flex"
                    direction="column"
                    marginTop={3}
                  >
                    <Grid item>
                      <StyledTypography
                        color="#96A7B4"
                        marginBottom="4px"
                        sx={{ fontWeight: 400 }}
                      >
                        Recently Added
                      </StyledTypography>
                      <List
                        sx={{
                          width: "100%",

                          borderRadius: "4px",
                          padding: 0,
                        }}
                      >
                        {recentlyAdded?.map((value, index) => (
                          <CustomListItem
                            key={value._id}
                            disableGutters
                            sx={{
                              backgroundColor: "#E9EBEF",
                              cursor: "pointer",
                              border: "1px solid #98A3B4",

                              borderRadius: "4px",
                              marginBottom: "4px",
                              height: "52px",
                              paddingLeft: "12px",
                            }}
                            onClick={() => {
                              removeCompanyFromRecentlyAdded(value, index);
                            }}
                          >
                            <ListItemText
                              primary={value.name}
                              primaryTypographyProps={{
                                style: { color: "black" },
                              }}
                            />
                            <IconButton
                              sx={{ "& svg path": { fill: "#F83A3A" } }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </CustomListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                ""
              )}

              <div>
                <Grid container display="flex" direction="column" marginTop={3}>
                  <Grid item>
                    <StyledTypography
                      color="#96A7B4"
                      marginBottom="4px"
                      sx={{ fontWeight: 400 }}
                    >
                      Companies Added : <b>{companies?.length} Companies</b>
                    </StyledTypography>
                    <List
                      sx={{
                        width: "100%",

                        borderRadius: "4px",
                        padding: 0,
                      }}
                    >
                      {companies?.map((value, index) => (
                        <CustomListItem
                          key={value._id}
                          disableGutters
                          sx={{
                            backgroundColor: "#E9EBEF",
                            cursor: "pointer",
                            border: "1px solid #98A3B4",

                            borderRadius: "4px",
                            marginBottom: "4px",
                            height: "52px",
                            paddingLeft: "12px",
                          }}
                          onClick={() => {
                            removeCompanyFromPortfolio(value, index);
                          }}
                        >
                          <ListItemText
                            primary={value.name}
                            primaryTypographyProps={{
                              style: { color: "#4D5E7C" },
                            }}
                          />
                          <IconButton
                            sx={{ "& svg path": { fill: "#F83A3A" } }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </CustomListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item marginTop={3}>
                    <StyledButton
                      onClick={updatePortfolio}
                      fullWidth
                      variant="contained"
                    >
                      {portfolioCompanies?.length ? "Save" : "Create Now"}
                    </StyledButton>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default PulseSearch;
