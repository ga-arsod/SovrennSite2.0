"use client";
import React, { useState } from 'react';
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
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import moment from "moment"
import Link from 'next/link';

const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.themeGreen};
  position: relative; 
  padding: 24px 16px 12px 16px; 
  cursor: pointer; 

  &:hover {
    color: ${colors.navyBlue500}; 
  }
  &:hover .arrow-icon {
    opacity: 1; 
  }
`;

const HeaderTextWrapper = styled('div')`
  display: flex;
  align-items: center;
  position: relative;
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
const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
 && {
    font-size: 12px; 
    color: ${colors.navyBlue500}; 
  }
`;

const StyledBodyTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  &:hover {
    color: ${colors.themeGreen}; 
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



const SearchTableData = ({data}) => {
  const router=useRouter();
  
  return (
    <>
      <Box sx={{ paddingX: 2, marginTop: 3, border: `1px solid ${colors.neutral600}`, borderRadius: 1 }}>
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none', paddingY: 0 }}>
          <Table sx={{ borderCollapse: 'separate' }}>
            <TableHead>
              <TableRow
                sx={{
                  '& th': { borderBottom: 'none' }, 
                }}
              >
                <StyledTableCell>
                  <HeaderTextWrapper>
                    Date of Info
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell>
                  <HeaderTextWrapper>
                  Description
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
               
                
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '& td': { paddingX: 2, borderBottom: `1px solid ${colors.neutral700}` },
                    '&:last-child td': { borderBottom: 'none' }, 
                  }}
                >
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>  {moment(row.createdAt).format("Do MMM YY")}</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.navyBlue500 }}>{row.description}</StyledBodyTableCell>
                 
                  <StyledBodyTableCell>
                  <Link target="blank" href={`/prime/${row.slug}`} style={{textDecoration:"none"}}>
                    <StyledButton  
                          variant="outlined" endIcon={<StyledArrowForwardIosIcon />} size="small">
                      Read
                    </StyledButton>
                    </Link>
                  </StyledBodyTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SearchTableData;