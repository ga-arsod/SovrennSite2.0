"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";



const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.themeGreen};
  position: relative; // Set position relative for positioning the icon
  padding: 24px 16px 12px 16px; // Adjust padding for alignment
  cursor: pointer; // Add cursor pointer to indicate it's clickable
white-space:nowrap;
  &:hover {
    color: ${colors.navyBlue500}; // Change to the desired hover color
  }
  &:hover .arrow-icon {
    opacity: 1; // Show icon on hover
  }
`;

const HeaderTextWrapper = styled("div")`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledArrowUpwardIcon = styled(ArrowUpwardIcon)`
  && {
    font-size: 18px; // Decrease the icon size
    color: ${colors.navyBlue500}; // Ensure the icon color does not change
    margin-left: 8px; // Space between text and icon
    opacity: 0; // Hide the icon by default
    transition: opacity 0.3s; // Smooth transition for showing/hiding
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  }
`;


const StyledBodyTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing:-0.02em;
  
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  white-space:nowrap;
  border-color: ${colors.navyBlue500};
  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
  }
`;
const headerData = [
  "Company Name",
  "Industry",
  "Open Date",
  "Closing Date",
  "Listing Date",
  "Offer Price PE",
  "LY Sales Growth",
  "Article",
];
const data = [
  {
    opening_date: "7th Oct 23",
    company_name: "Plada Infotech Services Pvt. Ltd. ",
    sector: "Plastics",
    industry: "Plastic Products",
    closing_date: "8th Oct 23",
    listing_date: "9th Oct 23",
    offer_price_pe: "45.5x",
    ly_sales_growth: "154%",
  },
  {
    opening_date: "7th Oct 23",
    company_name: "Maitreya Medicare Ltd. ",
    sector: "Entertainment",
    industry: "Software",
    closing_date: "8th Oct 23",
    listing_date: "9th Oct 23",
    offer_price_pe: "45.5x",
    ly_sales_growth: "154%",
  },
  {
    opening_date: "7th Oct 23",
    company_name: "On Door Concepts Ltd.",
    sector: "Technology",
    industry: "Electronics",
    closing_date: "8th Oct 23",
    listing_date: "9th Oct 23",
    offer_price_pe: "45.5x",
    offer_price_pe: "45.5x",
    ly_sales_growth: "154%",
  },
  {
    opening_date: "7th Oct 23",
    company_name: "Plada Infotech Services Pvt. Ltd.",
    sector: "Chemicals",
    industry: "Fertilisers and Agrochem.",
    closing_date: "8th Oct 23",
    listing_date: "9th Oct 23",
    offer_price_pe: "45.5x",
    offer_price_pe: "45.5x",
    ly_sales_growth: "154%",
  },
];

const IpoTableData = () => {
  return (
     <Container>
      <Box
        sx={{
          paddingX: 2,
          marginTop: 3,
          marginBottom: "200px",
          border: `1px solid ${colors.neutral600}`,
          borderRadius: 1,
        }}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ boxShadow: "none", paddingY: 0 }}
        >
          <Table sx={{ borderCollapse: "separate" }}>
            <TableHead>
              <TableRow
                sx={{
                  "& th": { borderBottom: "none" }, // Remove bottom border
                }}
              >
                {headerData.map((header_name, index) => {
                  return (
                    <>
                      <StyledTableCell key={index}>
                        <HeaderTextWrapper>
                          {header_name}
                          <StyledArrowUpwardIcon className="arrow-icon" />
                        </HeaderTextWrapper>
                      </StyledTableCell>
                    </>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "& td": {
                      paddingX: 2,
                      borderBottom: `1px solid ${colors.neutral700}`,
                    },
                    "&:last-child td": { borderBottom: "none" },
                  }}
                >
                  <StyledBodyTableCell sx={{ color: colors.navyBlue500 }}>
                    {row.company_name}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                    {row.industry}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                    {row.opening_date}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                    {row.closing_date}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                    {row.listing_date}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                    {row.offer_price_pe}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                    {row.ly_sales_growth}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell>
                    <StyledButton variant="outlined" size="small">
                      Read
                    </StyledButton>
                  </StyledBodyTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </Container>
   
  );
};

export default IpoTableData;
