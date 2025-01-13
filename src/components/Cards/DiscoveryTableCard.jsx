"use client";
import React, { useState } from "react";
import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import LoginModal from "../Modal/LoginModal";
import PaymentModal from "../PayU/PaymentModal";

const StyledTypography1 = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
`;
const StyledTypography4 = styled(Typography)`
  font-size: 14px;
  line-height: 17px;
  color: black;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
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

const DiscoveryTableCard = ({ tableData, id }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <PaymentModal
        isPaymentOpen={isPaymentOpen}
        handlePaymentClose={handlePaymentClose}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          marginBottom={5}
          justifyContent="center"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {tableData?.companies?.map((item, index) => (
          
            <Box
              key={index}
              sx={{
                backgroundColor: "#FAF9F9",
                border: "1px solid  #E6E8E9",
                borderRadius: "4px",
                maxWidth: "472px",
                width: "100%",
                padding: 2,
                boxSizing: "border-box",
                margin: "auto",
              }}
            >
            
              <StyledTypography1
                color={colors.greyBlue900}
                sx={{ fontWeight: "400" }}
                component="span"
              >
                {`Date Of Info. `}
              </StyledTypography1>
              <StyledTypography1
                color={colors.navyBlue500}
                sx={{ fontWeight: "600" }}
                component="span"
              >
                {item?.date ? moment(item?.date).format("Do MMM YY") : "NA"}
              </StyledTypography1>

              {isAuth && ((index % 2 === 0 && tableData?.basket?.avail_free) ||
              userDetails?.subscriptions?.includes("full-access") ||
              userDetails?.subscriptions?.includes("monthly") ||
              userDetails?.subscriptions?.includes("quarterly") ||
              userDetails?.subscriptions?.includes("life") ||
              userDetails?.subscriptions?.includes("trial") ||
              userDetails?.subscriptions?.includes("basket")) ? (
                <StyledTypography2
                  marginTop={1}
                  color={colors.navyBlue500}
                  component="div"
                >
                  {item?.company_name}
                </StyledTypography2>
              ) : (
                <StyledTypography2
                  marginTop={1}
                  color={colors.navyBlue500}
                  component="div"
                >
                  Company {wordsStr[index]}
                </StyledTypography2>
              )}

              <Box marginTop={1}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <StyledTypography3
                      color={colors.greyBlue900}
                      sx={{ fontWeight: "400" }}
                      component="span"
                    >
                      {`Market Cap (in Cr.) :  `}
                    </StyledTypography3>
                    <StyledTypography3
                      color={colors.navyBlue500}
                      sx={{ fontWeight: "600" }}
                      component="span"
                    >
                      {item?.market_cap ? item?.market_cap : "NA"}
                    </StyledTypography3>
                  </Grid>
                  <Grid item>
                    <StyledTypography3
                      color={colors.greyBlue900}
                      sx={{ fontWeight: "400" }}
                      component="span"
                    >
                      {`TTM PE : `}
                    </StyledTypography3>
                    <StyledTypography3
                      color={colors.navyBlue500}
                      sx={{ fontWeight: "600" }}
                      component="span"
                    >
                      {item?.ttm_pe ? `${item?.ttm_pe}x` : "NA"}
                    </StyledTypography3>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ paddingBottom: "8px", borderColor: "#E6E6E6" }} />
              <StyledTypography4 textAlign="left" marginTop={1}>
                {item?.remark || "NA"}
              </StyledTypography4>
              <Divider sx={{ paddingTop: "8px", borderColor: "#E6E6E6" }} />
              <Grid
                item
                sx={{ display: "flex", justifyContent: "flex-end" }}
                marginBottom={0.5}
                marginTop={1}
              >
                <StyledButton2
                  onClick={() => {
                    handleRowClick(index, item);
                  }}
                  variant="contained"
                >
                  Read
                </StyledButton2>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DiscoveryTableCard;
