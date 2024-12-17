import React from "react";
import { Grid, Typography, Box, Button, Divider } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import Link from "next/link";
import NoData from "../NoData/NoData";
import moment from "moment";
import LoginModal from "../Modal/LoginModal";
import PaymentModal from "../PayU/PaymentModal";

const StyledTypography3 = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
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

const IpoCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen,setIsPaymentOpen]=useState(false)
  const { isAuth ,userDetails} = useSelector((store) => store.auth);
  const handleClose=()=>{
    setIsOpen(false)
  }
  const handlePaymentClose=()=>{
    setIsPaymentOpen(false)
  }

  const articleRedirect = (ind, row) => {
    if (
     
      userDetails?.subscriptions?.includes("full-access") ||
      userDetails?.subscriptions?.includes("monthly") ||
      userDetails?.subscriptions?.includes("quarterly") ||
      userDetails?.subscriptions?.includes("life") ||
      userDetails?.subscriptions?.includes("trial") 
       && isAuth
    ) {
      return decodeURIComponent(`/ipo-zone/${(row.slug)}`);
    } else 
    setIsPaymentOpen(true);
  };

  const handleRowClick = (index,row) => {
    if (isAuth) {
      const redirectUrl = articleRedirect(index,row);
      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
      }
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
    <LoginModal isOpen={isOpen} handleClose={handleClose}/>
    <PaymentModal isPaymentOpen={isPaymentOpen} handlePaymentClose={handlePaymentClose}/>
      {data?.length == 0 ? (
        <NoData text="No data available" />
      ) : (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
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
              padding: { xs: 1 },
            }}
          >
            {data?.map((row, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "400px",
                    position: "relative",
                    backgroundColor: "#EFF2F4",
                    borderRadius: "4px",
                    maxWidth: "474px",
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "auto",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor:
                        row.status == "Open"
                          ? "#C5EFC5"
                          : row.status == "Upcoming"
                          ? "#FAD28F"
                          : row.status == "Closing Today"
                          ? "#F60909"
                          : row.status == "Closed"
                          ? "#FB8E8E"
                          : row.status == "Listing Today"
                          ? "#011627"
                          : "",
                      color:
                        row.status == "Open"
                          ? "#000000"
                          : row.status == "Upcoming"
                          ? "#000000"
                          : row.status == "Closing Today"
                          ? "white"
                          : row.status == "Closed"
                          ? "black"
                          : row.status == "Listing Today"
                          ? "white"
                          : "",
                      borderRadius: "0px 4px 0px 4px",
                      padding: "8px 22px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: "600",
                        lineHeight: "12px",
                      }}
                    >
                      {row.status=="Listed" ?"":row.status
                       }
                    </Typography>
                  </Box>

                  <StyledTypography2
                    width="70%"
                    component="div"
                    marginBottom={1}
                  >
                    {row?.company_Id?.company_name}
                  </StyledTypography2>

                  <Grid container justifyContent="space-between">
                    <Grid item xs={6}>
                      <StyledTypography3
                        color={colors.greyBlue900}
                        sx={{ fontWeight: "400" }}
                        component="span"
                      >
                        {`Sector : `}
                      </StyledTypography3>
                      <StyledTypography3
                        color={colors.navyBlue500}
                        sx={{ fontWeight: "600" }}
                        component="span"
                      >
                        {row?.company_Id?.industry}
                      </StyledTypography3>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <StyledTypography3
                        color={colors.greyBlue900}
                        sx={{ fontWeight: "400" }}
                        component="span"
                      >
                        {`Offer Price P.E. :`}
                      </StyledTypography3>
                      <StyledTypography3
                        color={colors.navyBlue500}
                        sx={{ fontWeight: "600" }}
                        component="span"
                      >
                        {row?.company_Id?.offer_price_ttm_pe
                          ? `${row?.company_Id?.offer_price_ttm_pe}x`
                          : "NA"}
                      </StyledTypography3>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" marginTop={1}>
                    <Grid item xs={6}>
                      <StyledTypography3
                        color={colors.greyBlue900}
                        sx={{ fontWeight: "400" }}
                        component="span"
                      >
                        {`Open Date :`}
                      </StyledTypography3>
                      <StyledTypography3
                        color={colors.navyBlue500}
                        sx={{ fontWeight: "600" }}
                        component="span"
                      >
                        {moment(row?.opening_date).format("Do MMM YY")}
                      </StyledTypography3>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <StyledTypography3
                        color={colors.greyBlue900}
                        sx={{ fontWeight: "400" }}
                        component="span"
                      >
                        {`Close Date :`}
                      </StyledTypography3>
                      <StyledTypography3
                        color={colors.navyBlue500}
                        sx={{ fontWeight: "600" }}
                        component="span"
                      >
                        {moment(row?.closing_date).format("Do MMM YY")}
                      </StyledTypography3>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" marginTop={1}>
                    <Grid item xs={6}>
                      <StyledTypography3
                        color={colors.greyBlue900}
                        sx={{ fontWeight: "400" }}
                        component="span"
                      >
                        {`Listing Date :`}
                      </StyledTypography3>
                      <StyledTypography3
                        color={colors.navyBlue500}
                        sx={{ fontWeight: "600" }}
                        component="span"
                      >
                        {moment(row?.listing_date).format("Do MMM YY")}
                      </StyledTypography3>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <StyledTypography3
                        color={colors.greyBlue900}
                        sx={{ fontWeight: "400" }}
                        component="span"
                      >
                        {`LY Sales Growth :`}
                      </StyledTypography3>
                      <StyledTypography3
                        color={colors.navyBlue500}
                        sx={{ fontWeight: "600" }}
                        component="span"
                      >
                        {row?.company_Id?.revenue_growth
                          ? `${row?.company_Id?.revenue_growth}%`
                          : "NA"}
                      </StyledTypography3>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ paddingBottom: "8px", borderColor: "#E6E6E6" }}
                  />
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                   <StyledButton2 variant="contained" color="primary" onClick={()=>{handleRowClick(index,row)}}>
                        Read
                      </StyledButton2>
                    
                  </Box>
                </Box>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default IpoCard;
