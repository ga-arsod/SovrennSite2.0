"use client";
import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { colors } from "../Constants/colors";
import Pagination from "../Pagination/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.themeGreen};
  border-bottom: 1px solid ${colors.neutral700};
`;

const StyledTableCell2 = styled(TableCell)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  padding: 16px 24px 16px 24px; /* Adjust padding to create space within the cell */
  border-bottom: 1px solid ${colors.neutral500};
  position: relative; /* Ensure the SlideBox is positioned relative to this cell */
  overflow: hidden; /* Hide any overflowing content */
  margin-bottom: 16px; /* Add margin to create space between rows */
 
`;

const CustomIconButton = styled(IconButton)`
  padding: 2px;
  height: 18px;
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b0b7bc;
  border-radius: 50%;
  background-color: ${colors.white};
`;

const SlideBox = styled(Box)`
  position: absolute;
  top: 0;
  right: -200px; /* Position off-screen initially */
  transform: translateX(${(props) => (props.hovered ? "-100%" : "0")});
  width: 200px;
  height: 100%; /* Take the height of the row */
  background-color: ${colors.navyBlue500};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.7s ease, opacity 0.3s ease;
  z-index: 10;
  color: ${colors.white};
  cursor: pointer;
  opacity: ${(props) => (props.hovered ? "1" : "0")};
  pointer-events: ${(props) => (props.hovered ? "auto" : "none")};
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: ${colors.neutral600}; /* Change this to your desired hover color */
  }
`;

export default function DiscoveryTable() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const totalPages = 20; // Example total pages, you can fetch this from an API
  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none", position: "relative", overflowX: "auto" }}>
        <Table sx={{ minWidth: 1000, border: `1px solid ${colors.neutral600}` }} aria-label="simple table">
          <TableHead sx={{borderBottom:"none"}}>
            <TableRow sx={{borderBottom:"none"}}>
              <StyledTableCell width="20%">Company Name</StyledTableCell>
              <StyledTableCell width="15%">Market Cap(in Cr)</StyledTableCell>
              <StyledTableCell width="10%">TTM PE</StyledTableCell>
              <StyledTableCell width="15%">Date of Info</StyledTableCell>
              <StyledTableCell width="40%">Remarks</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{padding:"40px"}}>
            {Array.from("abcedef").map((row, index) => (
              <StyledTableRow key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                <StyledTableCell2 sx={{ color: colors.navyBlue500 ,fontWeight:600}} align="left">
             
                  Balu Forge Industries Ltd.
              
                </StyledTableCell2>
                <StyledTableCell2 sx={{ color: colors.neutral900 }} align="center">223</StyledTableCell2>
                <StyledTableCell2 sx={{ color: colors.neutral900 }}>34x</StyledTableCell2>
                <StyledTableCell2 sx={{ color: colors.neutral900 }}>7th Oct 23</StyledTableCell2>
                <StyledTableCell2 sx={{ color: colors.neutral900, textAlign: "justify" }}>
                  BoD considered and approved the allotment of 25L equity shares to Sixteenth Street Asian Gems Fund (Non-promoter) and 50L warrants to Promoter Group, at INR 183.6 per unit, aggregating to INR 138 Cr. The issuance of these units were earlier approved by the Board in Sep 2023.
                  <SlideBox hovered={hoveredRow === index}>
                    <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '17px', marginRight: '8px' }}>Read More</Typography>
                    <CustomIconButton>
                      <ArrowForwardIosIcon fontSize='small' sx={{ color: colors.themeGreen, fontSize: '12px' }} />
                    </CustomIconButton>
                  </SlideBox>
                </StyledTableCell2>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Pagination totalPages={totalPages} />
      </Box>
    </>
  );
}