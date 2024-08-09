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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Link from "next/link";


const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.themeGreen};
  position: relative;
  padding: 24px 16px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: ${colors.navyBlue500};
  }
  &:hover .arrow-icon {
    opacity: 1;
  }
`;

const StyledTableCell2 = styled(TableCell)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  padding: 16px 24px;
  border-bottom: 1px solid ${colors.neutral500};
  position: relative;
  overflow: hidden;
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

const HeaderTextWrapper = styled('div')`
  display: flex;
  align-items: center;
  position: relative;
`;

const SlideBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: ${colors.navyBlue500};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.7s ease, opacity 0.3s ease;
  z-index: 10;
  color: ${colors.white};
  cursor: pointer;
  transform: translateX(${(props) => (props.hovered ? "0" : "100%")});
  opacity: ${(props) => (props.hovered ? "1" : "0")};
  pointer-events: ${(props) => (props.hovered ? "auto" : "none")};
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: ${colors.neutral600};
  }
  position: relative; // Ensure SlideBox positions relative to this row
`;

const StyledBodyTableCell = styled(TableCell)`

  font-size: 16px;
  line-height: 19px;
  padding: 16px 24px;
  position: relative;
  overflow: hidden;
`;

const StyledArrowUpwardIcon = styled(ArrowUpwardIcon)`
  && {
    font-size: 18px;
    color: ${colors.navyBlue500};
    margin-left: 8px;
    opacity: 0;
    transition: opacity 0.3s;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  }
`;

const headerData = ["Company Name", "Market Cap(in Cr)", "TTM PE", "Date of Info", "Remarks"];

export default function DiscoveryTable({ tableData,id }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  const totalPages = 20;

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>
      <Box
        sx={{
          paddingX: 0,
          marginTop: 3,
          marginBottom: "200px",
          border: `1px solid ${colors.neutral600}`,
          borderRadius: 1,
         overflowX:'hidden'
         
        
      }}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ boxShadow: "none", paddingY: 0 }}
        >
          <Table sx={{ borderCollapse: "separate" }}>
            <TableHead>
              <TableRow>
                {headerData.map((header_name, index) => (
                  <StyledTableCell
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <HeaderTextWrapper>
                      {header_name}
                      <StyledArrowUpwardIcon className="arrow-icon" />
                    </HeaderTextWrapper>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item, index) => (
                <StyledTableRow
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <StyledBodyTableCell sx={{ color: colors.navyBlue500 ,fontWeight:'600'}} align="left">
                    {item?.company_name}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 ,fontWeight:'400' }}>
                    {item?.market_cap}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900,fontWeight:'400' }}>
                    {item?.ttm_pe}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 ,fontWeight:'400'}}>
                    {item?.date}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900, textAlign: 'justify', position: 'relative' }}>
                    {item?.remark}
                    <Link target="_blank" href={`/discovery/${id}/${item?.slug}`}>
                    <SlideBox hovered={hoveredRow === index}>
                      <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '17px', marginRight: '8px' }}>
                        Read More
                      </Typography>
                      <CustomIconButton>
                        <ArrowForwardIosIcon fontSize='small' sx={{ color: colors.themeGreen, fontSize: '12px' }} />
                      </CustomIconButton>
                    </SlideBox>
                    </Link>
                  </StyledBodyTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={2}>
        <Pagination totalPages={totalPages} />
      </Box>
    </>
  );
}