"use client";
import React, { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { getAlertKeywordsApi ,updateAlertKeywordApi} from "@/app/Redux/Slices/filingSlice";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../../../components/Snackbar/SnackBar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { colors } from "../../../components/Constants/colors";
import NoLogin from "../../../components/Auth/NoLogin";


const StyledTypography = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
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
  width:100%;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;
const StyledChip = styled(Chip)`
  margin: 5px;
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${colors.navyBlue500};
  .MuiChip-label {
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: ${colors.white};
    padding-left: 4px;
  }
`;
const FilingAlert = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { alertkeywords } = useSelector((store) => store.filing);
  const { isAuth } = useSelector((store) => store.auth);

  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddKeyword = () => {
    if (inputValue.trim() && keywords.length < 30) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  

  const handleClearAll = () => {
    setKeywords([]);
  };
  const handleDeleteKeyword = (index) => {
    console.log(index,"index")
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  const handleBackClick = () => {
    router.back();
  };
const handleUpdateKeyword=()=>{
  dispatch(updateAlertKeywordApi({keywords:keywords}))
}
 

  useEffect(() => {
    if(isAuth)
    setKeywords([...alertkeywords]);
  }, [alertkeywords]);


  if (!isAuth) {
    return <NoLogin />;
  }
 console.log(keywords,"keywords")
  return (
    <>
      <Container sx={{ paddingBottom: "20px" }}>
        <Grid container marginTop="90px">
         <Snackbar/>
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
                Set <span style={{ color: colors.themeGreen }}>Alert</span>
              </StyledTypography1>
            </Box>

            <StyledTypography2 color={colors.navyBlue300} mt={1}>
              Set an alert to receive notifications whenever your keyword is
              mentioned.
            </StyledTypography2>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container width={{ xs: "100%", sm: "550px" }} marginTop={5}>
            <Grid item width="100%">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="E.g. Preferential, expanding etc."
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
                          fontSize: "17px",
                          lineHeight: "21px",
                          opacity: 1,
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px", // Rounded only on the left side
                        "& fieldset": {
                          borderColor: "#98A3B4",
                        },
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleAddKeyword}
                    disabled={!inputValue.trim() || keywords.length >= 30}
                    sx={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "#CED6DC !important",
                      borderRadius: "4px",

                      "&:hover": { backgroundColor: "#BDBDBD !important" },
                    }}
                  >
                    <AddIcon sx={{ color: "white", fontSize: 36 }} />
                  </IconButton>
                </div>
              </Box>
              <Grid item width="100%">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <StyledTypography color="#98A3B4">
                    Added Keywords: {keywords.length}/30
                  </StyledTypography>
                  {keywords.length > 0 && (
                    <StyledTypography
                      color="#F60909"
                      sx={{ cursor: "pointer" }}
                      onClick={handleClearAll}
                    >
                      Clear all
                    </StyledTypography>
                  )}
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {keywords.map((keyword, index) => (
                    <StyledChip
                      key={index}
                      label={keyword}
                     
                      icon={
                        <IconButton>
                          <HighlightOffSharpIcon
                            sx={{
                              color: colors.white,
                              fontSize: "24px",
                              fontWeight: "600",
                            }}
                            onClick={() => handleDeleteKeyword(index)}
                          />
                        </IconButton>
                      }
                      sx={{
                        color: colors.white,
                        margin: "5px",
                        backgroundColor: colors.navyBlue500,
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
                              <Grid item marginTop={30} width="100%">
                                <StyledButton
                                  onClick={handleUpdateKeyword}
                                  fullWidth
                                  variant="contained"
                                >
                                 Set Alert
                                </StyledButton>
                              </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default FilingAlert;
