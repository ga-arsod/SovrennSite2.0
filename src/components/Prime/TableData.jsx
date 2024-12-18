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
import NoData from "../../components/NoData/NoData";
import { setSortBy, toggleSortOrder } from "@/app/Redux/Slices/sortingSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoginModal from "../Modal/LoginModal";
import PaymentModal from "../PayU/PaymentModal";

const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  white-space: nowrap;
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
    color: white;
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
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 120px;
  white-space: nowrap;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
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
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector((state) => state.sorting);

  const handleSortChange = (field) => {
    dispatch(setSortBy(field));

    if (sortBy === field) {
      dispatch(toggleSortOrder());
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
  };

  const articleRedirect = (ind, elem) => {
    if (
      userDetails?.subscriptions?.includes("full-access") ||
      userDetails?.subscriptions?.includes("monthly") ||
      userDetails?.subscriptions?.includes("quarterly") ||
      userDetails?.subscriptions?.includes("life") ||
      (userDetails?.subscriptions?.includes("trial") && isAuth)
    ) {
      return activeTab == "two"
        ? `/prime/${elem.slug}?s=promoter_interview`
        : `/prime/${elem.slug}`;
    } else setIsPaymentOpen(true);
  };

  const handleRowClick = (index, row) => {
    if (isAuth) {
      const redirectUrl = articleRedirect(index, row);
      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
      }
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <PaymentModal
        isPaymentOpen={isPaymentOpen}
        handlePaymentClose={handlePaymentClose}
      />
      {data.length == 0 ? (
        <NoData text="No data available." />
      ) : (
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
                        <StyledTableCell
                          key={index}
                          onClick={() => handleSortChange(item?.id)}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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

                  <StyledTableCell></StyledTableCell>
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
                      {elem.price === 0 ? (
                        <Link
                          href={
                            activeTab == "two"
                              ? `/prime/${elem.slug}?s=promoter_interview`
                              : `/prime/${elem.slug}`
                          }
                          target="blank"
                        >
                          <StyledButton2
                            variant="contained"
                            endIcon={<StyledArrowForwardIosIcon />}
                            size="small"
                          >
                            Read Free
                          </StyledButton2>
                        </Link>
                      ) : (
                        <StyledButton2
                          onClick={() => {
                            handleRowClick(index, elem);
                          }}
                          variant="contained"
                          endIcon={<StyledArrowForwardIosIcon />}
                          size="small"
                        >
                          Read
                        </StyledButton2>
                      )}
                    </StyledBodyTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default TableData;
