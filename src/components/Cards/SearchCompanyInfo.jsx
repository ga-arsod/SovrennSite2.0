"use client";
import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, minmax(280px, 419px));
    justify-content: center; /* Centering the grid items */
  }

  @media (min-width: 640px) and (max-width: 1024px) {
  grid-template-columns: repeat(2, minmax(350px, 332px));
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
 
`;

const StyledGrid = styled(Box)`
  cursor: pointer;
  border: 1px solid ${colors.neutral600};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  height: 204px;
  max-width: 100%; /* Ensures it doesn’t exceed the width */
  position: relative;
  transition: background-color 0.8s;

  &:hover {
    background-color: ${colors.green50};

    .arrow-icon {
      transform: rotate(-45deg);
      color: white;
      font-size: 14px;
    }

    .icon-button {
      background-color: ${colors.themeGreen};
      border-color: ${colors.navyBlue900};
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 11px;
    margin-top: auto;
  }
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b0b7bc;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.5s, border-color 0.5s, transform 0.5s;

  .arrow-icon {
    transition: transform 0.8s;
  }
`;

const stripHtmlTags = (text) => {
  text = text
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll(/<\/?[^>]+(>|$)/g, "");

  return text;
};

const SearchCompanyInfo = ({ content, textSearch }) => {
  const getLinkHref = (ele) => {
    let baseUrl = `/${ele.data.page2 + "/data/" + ele.data.params.slug}`;
    let baseUrl2 = `/company?q=${ele._id}`;
    if (textSearch === "textSearch") {
      return baseUrl2;
    } else {
      return baseUrl;
    }
  };
  
  return (
    <>
      <Box marginTop={2}>
        <GridContainer>
          {content.map((ele, index) => (
            <StyledGrid key={index}>
               <Link target="_blank" href={`/discovery/data/${ele.data.params.slug}`} style={{textDecoration:"none"}}>
                <Box className="content">
                  <Grid
                    container
                    direction="column"
                    paddingY="12px"
                    paddingX="20px"
                  >
                    <Grid item>
                      <StyledTypography3 color={colors.navyBlue500}>{ele.company_name}</StyledTypography3>
                    </Grid>

                    <Grid item display="flex" justifyContent="flex-end">
                      <CustomIconButton className="icon-button">
                        <ArrowForwardIcon
                          fontSize="small"
                          className="arrow-icon"
                          sx={{ color: "#3C464F" }}
                        />
                      </CustomIconButton>
                    </Grid>

                    <Grid item marginTop={2}>
                      <StyledTypography1
                        color="#627B8F"
                        sx={{ fontWeight: 400 }}
                        marginBottom={1}
                      >
                        {stripHtmlTags(ele.sentence)}
                      </StyledTypography1>
                    </Grid>
                  </Grid>
                </Box>
              </Link>
            </StyledGrid>
          ))}
        </GridContainer>
      </Box>
    </>
  );
};

export default SearchCompanyInfo;
