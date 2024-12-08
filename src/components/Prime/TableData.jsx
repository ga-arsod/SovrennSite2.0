"use client";
import React, { useEffect, useState } from "react";
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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import moment from "moment";
import Link from "next/link";
import NoData from "../../components/NoData/NoData"
import { setSortBy,toggleSortOrder } from "@/app/Redux/Slices/sortingSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  white-space:nowrap;
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

const HeaderTextWrapper = styled("div")`
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
const StyledArrowDownwardIcon = styled(ArrowDownwardIcon)`
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
  white-space: nowrap;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.navyBlue500};
  min-width: 120px; 
  text-align: center; 
  
  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
  }
`;

const headerRowArray = [
  {
    name: "Date of Info",
    id: "date",
  },
  {
    name: "Company Name",
    id: "company_name",
  },
  {
    name: "Sector",
    id: "sector",
  },
  {
    name: "Industry",
    id: "industry",
  },
];


const TableData = ({ data, activeTab }) => {
  const router = useRouter();
  const dispatch=useDispatch();
  const { sortBy, sortOrder } = useSelector((state) => state.sorting);

  const handleSortChange = (field) => {
    dispatch(setSortBy(field));


    if (sortBy === field) {
      dispatch(toggleSortOrder());
    }
  };
 
  return (
    <>
    {
      data.length== 0 ?  <NoData text="No data available." />
      :
      <Box
      sx={{
        paddingX: 2,
        marginTop: 3,
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
          <TableRow>
                {headerRowArray?.map((item, index) => {
                  return (
                    <>
                      <StyledTableCell key={index}
                       onClick={() => handleSortChange(item?.id)}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {item?.name}
                          {sortBy === item.id ? (
                            sortOrder === "inc" ? (
                              <StyledArrowUpwardIcon
                                className="arrow-icon"
                               
                              />
                            ) : (
                              <StyledArrowDownwardIcon
                                className="arrow-icon"
                               
                              />
                            )
                          ) : (
                            <StyledArrowUpwardIcon
                              className="arrow-icon"
                             
                            />
                          )}
                        </div>
                      </StyledTableCell>
                    </>
                  );
                })}

                <StyledTableCell>
                  
                </StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((elem, index) => (
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
                <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                  {elem.price === 0 ||
                  (activeTab == "one" && elem?.is_promoter_interview_free)
                    ? "Free Sample"
                    : `${moment(elem.createdAt).format("Do MMM YY")}`}
                </StyledBodyTableCell>
                <StyledBodyTableCell sx={{ color: colors.navyBlue500 }}>
                  {elem.company_Id?.company_name
                    ? elem.company_Id?.company_name
                    : "NA"}
                </StyledBodyTableCell>
                <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                  {elem.company_Id?.sector ? elem.company_Id?.sector : "NA"}
                </StyledBodyTableCell>
                <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                  {elem.company_Id?.industry
                    ? elem.company_Id?.industry
                    : "NA"}
                </StyledBodyTableCell>
                <StyledBodyTableCell>
                  <Link target="_blank" href={activeTab == 'two' ? `/prime/${elem.slug}?s=promoter_interview` : `/prime/${elem.slug}`}>
                  <StyledButton
                    
                    variant="outlined"
                    endIcon={<StyledArrowForwardIosIcon />}
                    size="small"
                  >
                    {elem.price === 0 ? "Read Free" : "Read"}
                  </StyledButton>
                  </Link>
                </StyledBodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    }
   
     
    </>
  );
};

export default TableData;
