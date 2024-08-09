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
  Button,Grid
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";

import { useRouter } from 'next/navigation';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


// Define styled components for table cells
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

const StyledEditIcon = styled(ModeEditOutlineOutlinedIcon)`
 && {
    font-size: 16px; // Decrease the icon size
    color: ${colors.greyBlue500}; 
  }
`;

const StyledDeleteIcon = styled(DeleteOutlinedIcon)`
 && {
    font-size: 16px; // Decrease the icon size
    color:white; 
  }
`;

const StyledBodyTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  &:hover {
    color: ${colors.themeGreen}; // Change to the desired hover color
  }
`;

const StyledButton1 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.greyBlue500};
  padding: 8px 4px;
  text-transform: none;
  border-color: ${colors.greyBlue500};
  &:hover {
   
    color: ${colors.greyBlue500};
     border-color: ${colors.greyBlue500};
  }
`;
const StyledButton2 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color:white;
  padding: 8px 4px;
  text-transform: none;
  background-color:${colors.red300};
  border-color:${colors.red300};
  &:hover {
    background-color:${colors.red300};
  border-color:${colors.red300}
    color: white;
   
  }
`;



const WatchlistTable = () => {
  const router=useRouter();
  return (
  
      <Box sx={{ paddingX: 2, marginTop: {xs:3,sm:5},marginBottom:"200px", border: `1px solid ${colors.neutral600}`, borderRadius: 1 }}>
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
                  Added On
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell>
                  <HeaderTextWrapper>
                    Company Name
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell>
                  <HeaderTextWrapper>
                  Uptrend Potential
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell>
                  <HeaderTextWrapper>
                  Expected Price
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from("abcdefgh").map(( index) => (
                <TableRow
                  key={index}
                  sx={{
                    '& td': { paddingX: 2, borderBottom: `1px solid ${colors.neutral700}` },
                    '&:last-child td': { borderBottom: 'none' }, 
                  }}
                >
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>7th Oct 23</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.navyBlue500 }}>KPI Green Energy Ltd.</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>13%</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>₹48</StyledBodyTableCell>
                  <StyledBodyTableCell>
                    <Grid container flexDirection="column" gap={1}>
                  <StyledButton1  
                        variant="outlined" startIcon={<StyledEditIcon />} size="small">
                     Edit
                    </StyledButton1>
                    <StyledButton2 
                        variant="contained" startIcon={<StyledDeleteIcon />} size="small">
                      Remove
                    </StyledButton2>
                    </Grid>
                  </StyledBodyTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
   
  );
};

export default WatchlistTable;