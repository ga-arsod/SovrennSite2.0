"use client";
import React, { useState } from "react";
import moment from "moment";
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
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import Link from "next/link";
import NoData from "../NoData/NoData";
import PaymentModal from "../PayU/PaymentModal"
import LoginModal from "../Modal/LoginModal";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.themeGreen};
  position: relative;
  padding: 24px 16px 12px 16px; 
  cursor: pointer; 
white-space:nowrap;
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


const StyledBodyTableCell = styled(TableCell)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing:-0.02em;
  
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

const headerData = [
  "Company Name",
  "Industry",
  "Open Date",
  "Closing Date",
  "Listing Date",
  "Offer Price PE",
  "LY Sales Growth",
  "Article",
];


const IpoTableData = ({data}) => {
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
     <Container>
     
      {
         data.length== 0 ?  <NoData text="No data available" />
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
               <TableRow
                 sx={{
                   "& th": { borderBottom: "none" }, 
                 }}
               >
                 {headerData.map((header_name, index) => {
                   return (
                     <>
                       <StyledTableCell key={index}>
                         <HeaderTextWrapper>
                           {header_name}
                        
                         </HeaderTextWrapper>
                       </StyledTableCell>
                     </>
                   );
                 })}
               </TableRow>
             </TableHead>
             <TableBody>
               {data.map((row, index) => (
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
                   <StyledBodyTableCell sx={{ color: colors.navyBlue500 }}>
                   {row.company_Id?.company_name}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                   {row.company_Id?.industry}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                   {moment(row.opening_date).format("Do MMM YY")}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                   {moment(row.closing_date).format("Do MMM YY")}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                   {moment(row.listing_date).format("Do MMM YY")}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                   {row.company_Id?.offer_price_ttm_pe ? `${row.company_Id?.offer_price_ttm_pe}x` : "NA"}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell sx={{ color: colors.neutral900 }}>
                   {row.company_Id?.revenue_growth ? `${row.company_Id?.revenue_growth}%` : "NA"}
                   </StyledBodyTableCell>
                   <StyledBodyTableCell>
                    
                    
                     <StyledButton2 variant="contained" size="small" onClick={()=>{handleRowClick(index,row)}}>
                       Read
                     </StyledButton2>
                    
                   </StyledBodyTableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
       </Box>
      }
     
      </Container>
      </>
  );
};

export default IpoTableData;
