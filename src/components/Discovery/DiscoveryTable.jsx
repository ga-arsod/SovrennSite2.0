"use client";
import React, { useState ,useEffect} from "react";
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
import { resetSorting } from "@/app/Redux/Slices/sortingSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PaymentModal from "../PayU/PaymentModal";

import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "../Modal/LoginModal";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { setSortBy, toggleSortOrder } from "@/app/Redux/Slices/sortingSlice";

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

const HeaderTextWrapper = styled("div")`
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
  cursor: pointer;
  &:hover {
    background-color: ${colors.neutral600};
  }
  position: relative;
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

const wordsStr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "AA",
  "AB",
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AH",
  "AI",
  "AJ",
  "AK",
  "AL",
  "AM",
  "AN",
  "AO",
  "AP",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AV",
  "AW",
  "AX",
  "AY",
  "AZ",
  "BA",
  "BB",
  "BC",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BK",
  "BL",
  "BM",
  "BN",
  "BO",
  "BP",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BU",
  "BV",
  "BW",
  "BX",
  "BY",
  "BZ",
  "CA",
  "CB",
  "CC",
  "CD",
  "CE",
  "CF",
  "CG",
  "CH",
  "CI",
  "CJ",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CP",
  "CQ",
  "CR",
  "CS",
  "CT",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
];

export default function DiscoveryTable({ tableData, id ,sortOrder,setSortOrder,sortBy,setSortBy,bucket,isNestedRoute,containsDiscovery}) {
  const dispatch = useDispatch();
  const [hoveredRow, setHoveredRow] = useState(null);
  
  const [isOpen, setIsOpen] = useState(false);
 

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleSortChange = (field) => {
    setSortBy(field);
    if (sortOrder == "inc") setSortOrder("dec");
    else setSortOrder("inc");
  };

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
  };

  const articleRedirect = (ind, item) => {
    if (
      (ind % 2 === 0 && tableData?.basket?.avail_free) ||
      userDetails?.subscriptions?.includes("full-access") ||
      userDetails?.subscriptions?.includes("monthly") ||
      userDetails?.subscriptions?.includes("quarterly") ||
      userDetails?.subscriptions?.includes("life") ||
      userDetails?.subscriptions?.includes("trial") ||
      (userDetails?.subscriptions?.includes("basket") && isAuth)
    ) {
      return `/discovery/${id}/${item?.slug}`;
    } else setIsPaymentOpen(true);
  };

  const handleRowClick = (index, item) => {
    if (isAuth) {
      const redirectUrl = articleRedirect(index, item);
      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
      }
    } else {
      setIsOpen(true);
    }
  };

  
  const headerRowArray = [
    {
      name: "Company Name",
      id: "company_name",
    },
    {
      name: "Market Cap (In Crore)",
      id: "market_cap",
    },
    {
      name: "TTM PE",
      id: "ttm_pe",
    },
    {
      name: "Date of Info",
      id: "date",
    },
  ];
  const headerRowArray2 = headerRowArray.slice(0, -1);
 
  return (
    <>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <PaymentModal
        isPaymentOpen={isPaymentOpen}
        handlePaymentClose={handlePaymentClose}
      />
      <Box
        sx={{
          paddingX: 0,
          marginTop: 3,

          border: `1px solid ${colors.neutral600}`,
          borderRadius: 1,
          overflowX: "hidden",
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
                {(tableData?.bucket?.show_date ? headerRowArray : headerRowArray2)?.map((item, index) => {
                  return (
                    <>
                   
                      <StyledTableCell
                        key={index}
                        onClick={() => handleSortChange(item?.id)}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {item?.name}
                          {sortBy === item.id ? (
                            sortOrder === "inc" ? (
                              <StyledArrowUpwardIcon className="arrow-icon" />
                            ) : (
                              <StyledArrowDownwardIcon className="arrow-icon" />
                            )
                          ) : (
                            <StyledArrowUpwardIcon className="arrow-icon" />
                          )}
                        </div>
                      </StyledTableCell>
                    </>
                  );
                })}
               {
            !tableData?.bucket?.show_remark ? <></>:  <StyledTableCell>
                <HeaderTextWrapper>Remarks</HeaderTextWrapper>
              </StyledTableCell>
               }
               
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.companies?.map((item, index) => (
                <StyledTableRow
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleRowClick(index, item)}
                >
                  {isAuth && ((index % 2 === 0 && tableData?.basket?.avail_free) ||
                  userDetails?.subscriptions?.includes("full-access") ||
                  userDetails?.subscriptions?.includes("monthly") ||
                  userDetails?.subscriptions?.includes("quarterly") ||
                  userDetails?.subscriptions?.includes("life") ||
                  userDetails?.subscriptions?.includes("trial") ||
                  userDetails?.subscriptions?.includes("basket")) ? (
                    <StyledBodyTableCell
                      sx={{ color: colors.navyBlue500, fontWeight: "600" }}
                      align="left"
                    >
                      {item?.company_name}
                    </StyledBodyTableCell>
                  ) : (
                    <StyledBodyTableCell
                      sx={{ color: colors.navyBlue500, fontWeight: "600" }}
                      align="left"
                    >
                      Company {wordsStr[index]}
                    </StyledBodyTableCell>
                  )}

                  <StyledBodyTableCell
                    sx={{ color: colors.neutral900, fontWeight: "400" }}
                  >
                    {item?.market_cap ? item?.market_cap : "NA"}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell
                    sx={{ color: colors.neutral900, fontWeight: "400" }}
                  >
                    {item?.ttm_pe ? `${item?.ttm_pe}x` : "NA"}
                    {
                     (!tableData?.bucket?.show_date && !tableData?.bucket?.show_remark ) && 
                      <SlideBox hovered={hoveredRow === index}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          marginRight: "8px",
                        }}
                      >
                        Read More
                      </Typography>
                      <CustomIconButton>
                        <ArrowForwardIosIcon
                          fontSize="small"
                          sx={{
                            color: colors.themeGreen,
                            fontSize: "12px",
                          }}
                        />
                      </CustomIconButton>
                    </SlideBox>
                    }
                  </StyledBodyTableCell>
                  {
                    item?.date && 
                    <StyledBodyTableCell
                    sx={{ color: colors.neutral900, fontWeight: "400" }}
                  >
                    {item?.date ? moment(item.date).format("Do MMM YY") : "NA"}
                    {
                     (tableData?.bucket?.show_date && !tableData?.bucket?.show_remark ) && 
                      <SlideBox hovered={hoveredRow === index}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          marginRight: "8px",
                        }}
                      >
                        Read More
                      </Typography>
                      <CustomIconButton>
                        <ArrowForwardIosIcon
                          fontSize="small"
                          sx={{
                            color: colors.themeGreen,
                            fontSize: "12px",
                          }}
                        />
                      </CustomIconButton>
                    </SlideBox>
                    }
                  </StyledBodyTableCell>
                  }
                 
                  
                  {
                  tableData?.bucket?.show_remark &&
                    <StyledBodyTableCell
                    sx={{ color: colors.neutral900, position: "relative" }}
                  >
                    {item?.remark }
                    <SlideBox hovered={hoveredRow === index}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          marginRight: "8px",
                        }}
                      >
                        Read More
                      </Typography>
                      <CustomIconButton>
                        <ArrowForwardIosIcon
                          fontSize="small"
                          sx={{
                            color: colors.themeGreen,
                            fontSize: "12px",
                          }}
                        />
                      </CustomIconButton>
                    </SlideBox>
                  </StyledBodyTableCell>
                  }
                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
