"use client";
import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import moment from "moment";
import Link from "next/link";

const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    overflow-x: hidden;
    padding-left: 8px;
    padding-right: 8px;
    box-sizing: border-box;
  }
`;

const CustomCard = styled(Card)`
  border: 1px solid #dedddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: none;
  height: 215px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 1025px) {
    max-width: 674px;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 639px) {
    max-width: 100%;
    width: 100%;
    height: auto;
    padding: 0px;
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.neutral800};
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  border: 1px solid ${colors.themeGreen};
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  white-space: noWrap;
  text-transform: none;
  width: 100%;
  color: ${colors.themeGreen};
  padding-top: 12px;
  padding-bottom: 12px;
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const StyledTypographyFileLink = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: ${colors.themeGreen};
  :hover {
    color: white;
   
  }
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
  :hover {
    color: white;
    background-color: ${colors.themeButtonHover};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const SearchCompanyPulseAdd = ({ content }) => {
  return (
    <GridContainer marginTop={2}>
      {content?.map((ele, index) => (
        <CustomCard key={index}>
          <CardContent>
            <StyledTypography1 color={colors.navyBlue200}>
              {moment(ele?.news_date).format("Do MMM YYYY")} |{" "}
              {moment(ele.news_date).format("LT")}
            </StyledTypography1>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="8px"
            >
              <StyledTypography2>{ele.company_name}</StyledTypography2>
              {ele?.file_url ? (
                <Link
                  href={ele?.file_url}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                    <StyledTypographyFileLink>
                      File Link
                    </StyledTypographyFileLink>
                  </FileLinkButton>
                </Link>
              ) : (
                ""
              )}

              {ele.discovery_slug ? (
                <Link
                  href={`discovery/pulse/${ele.discovery_slug}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                    <StyledTypographyFileLink>
                      Read Discovery
                    </StyledTypographyFileLink>
                  </FileLinkButton>
                </Link>
              ) : (
                ""
              )}

              {ele.prime_slug ? (
                <Link
                  href={`prime/${ele.prime_slug}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                    <StyledTypographyFileLink>
                      Read Prime
                    </StyledTypographyFileLink>
                  </FileLinkButton>
                </Link>
              ) : (
                ""
              )}
            </Box>

            <StyledTypography3 marginTop={3}>
              {ele?.ai_summary}
            </StyledTypography3>

            {/* <StyledButton variant="outlined">
              + Add Company to Sovrenn Pulse
            </StyledButton> */}
          </CardContent>
        </CustomCard>
      ))}
    </GridContainer>
  );
};

export default SearchCompanyPulseAdd;
