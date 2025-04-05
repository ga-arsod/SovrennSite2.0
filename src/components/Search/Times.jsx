import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import moment from "moment";
import styles from "../../styles/searchnews.module.css";
import convertToHtml from "@/utils/convertToHtml";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
const StyledButton2 = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: white;
  border: 1px solid ${colors.themeGreen};

  :hover {
    background-color: white;
    color: ${colors.themeGreen};
  }
`;

const CustomDivider = styled(Divider)`
  background-color: #f8f7f7;
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const Times = ({ data }) => {
  const router = useRouter();
  const { timesPagination } = useSelector((store) => store.search);
  const company_summary = useSelector((store) => store.search.companySummary);
  
  const handleNavigation = (date) => {
    const searchQuery1 = encodeURIComponent(company_summary?.company_name || ""); 
  
    router.push(`/times?search=${searchQuery1}&date=${date.split("T")[0]}`);
  };
  return (
    <Box mt={2} mb={5}>
      <StyledTypography1 color={colors.navyBlue500}>Times</StyledTypography1>
      <StyledTypography2 color={colors.navyBlue300} mt={1}>
        {`Read the ${timesPagination?.total_documents} latest news related to KPI Green Energy Ltd.`}
      </StyledTypography2>

      {data?.map((elem, index) => {
        return (
          <Card variant="outlined" sx={{ mt: 2, borderRadius: 2, p: 1.5 }} key={index}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <StyledTypography3 color={colors.navyBlue500}>
                  {moment(elem?.createdAt).format("Do MMM YYYY")}
                </StyledTypography3>
                <StyledButton2
                  variant="outlined"
                  size="small"
                  endIcon={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  }
                  onClick={()=>{handleNavigation(elem?.createdAt)}}
                >
                  Read Full Article
                </StyledButton2>
              </Box>
              <CustomDivider sx={{ mt: 2, mb: 2 }} />

              <div id={styles.MainContainer}>{convertToHtml(elem?.blocks)}</div>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Times;
