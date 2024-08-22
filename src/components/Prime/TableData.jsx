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
  
    font-size: 18px; // Decrease the icon size
    color: ${colors.navyBlue500}; // Ensure the icon color does not change
    margin-left: 8px; // Space between text and icon
    opacity: 0; // Hide the icon by default
    transition: opacity 0.3s; // Smooth transition for showing/hiding
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

const data = [
  {
    date: '7th Oct 23',
    companyName: 'Kaka Industries Ltd.',
    sector: 'Plastics',
    industry: 'Plastic Products',
  },
  {
    date: '7th Oct 23',
    companyName: 'Network People Services Tech',
    sector: 'Entertainment',
    industry: 'Software',
  },
  {
    date: '7th Oct 23',
    companyName: 'NewJaisa Technologies Ltd.',
    sector: 'Technology',
    industry: 'Electronics',
  },
  {
    date: '7th Oct 23',
    companyName: 'Nirman Agri Genetics Ltd.',
    sector: 'Chemicals',
    industry: 'Fertilisers and Agrochem.',
  },
];

const TableData = () => {
  const router=useRouter();
  return (
    <Container>
      <Box sx={{ paddingX: 2, marginTop: 3,marginBottom:"200px", border: `1px solid ${colors.neutral600}`, borderRadius: 1 }}>
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none', paddingY: 0 }}>
          <Table sx={{ borderCollapse: 'separate' }}>
            <TableHead>
              <TableRow
                sx={{
                  '& th': { borderBottom: 'none' }, // Remove bottom border
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
                    Company Name
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell>
                  <HeaderTextWrapper>
                    Sector
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell>
                  <HeaderTextWrapper>
                    Industry
                    <StyledArrowUpwardIcon className="arrow-icon" />
                  </HeaderTextWrapper>
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '& td': { paddingX: 2, borderBottom: `1px solid ${colors.neutral700}` },
                    '&:last-child td': { borderBottom: 'none' }, // Remove border for the last row
                  }}
                >
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>{row.date}</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.navyBlue500 }}>{row.companyName}</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>{row.sector}</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ color: colors.neutral900 }}>{row.industry}</StyledBodyTableCell>
                  <StyledBodyTableCell>
                    <StyledButton  onClick={() => 
                          {
                           
                            router.push(`/prime/${row?.companyName}`)
                          }
                        } variant="outlined" endIcon={<StyledArrowForwardIosIcon />} size="small">
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

export default TableData;