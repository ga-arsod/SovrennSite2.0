import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import moment from "moment";
import styles from "../../styles/searchnews.module.css";
import convertToHtml from "@/utils/convertToHtml";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getTimesDataApi } from "@/app/Redux/Slices/searchSlice";

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
const StyledButton1 = styled(Button)`
  color: white;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 4px 14px;
  border-radius: 80px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
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
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (date) => {
    const searchQuery1 = encodeURIComponent(company_summary?.company_name || "");
    router.push(`/times?search=${searchQuery1}&date=${date.split("T")[0]}`);
  };

  useEffect(() => {
    dispatch(getTimesDataApi({ company_id: company_summary?._id, page: page }));
  }, [page]);

  return (
    <Box mt={2} mb={2}>
      <StyledTypography1 color={colors.navyBlue500}>Times</StyledTypography1>
      <StyledTypography2 color={colors.navyBlue300} mt={1}>
        {`Read the ${timesPagination?.total_documents} latest news related to ${company_summary?.company_name}.`}
      </StyledTypography2>

      {data?.map((elem, index) => (
        <Card variant="outlined" sx={{ mt: 2, borderRadius: 2, p: 1.5 }} key={index}>
          <CardContent>
            
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <StyledTypography3 color={colors.navyBlue500}>
                {moment(elem?.createdAt).format("Do MMM YYYY")}
              </StyledTypography3>

              {!isXs && (
                <StyledButton2
                  variant="outlined"
                  size="small"
                  endIcon={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  }
                  onClick={() => {
                    handleNavigation(elem?.createdAt);
                  }}
                >
                  Read Full Article
                </StyledButton2>
              )}
            </Box>

            <CustomDivider sx={{ mt: 2, mb: 2 }} />

            <div id={styles.MainContainer}>{convertToHtml(elem?.blocks)}</div>

           
            {isXs && (
              <Box mt={2} display="flex" justifyContent="flex-end">
                <StyledButton2
                  variant="outlined"
                  size="small"
                 
                  endIcon={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  }
                  onClick={() => {
                    handleNavigation(elem?.createdAt);
                  }}
                >
                  Read Full Article
                </StyledButton2>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}

     
      {timesPagination?.total_pages !== timesPagination?.page && (
        <Box sx={{ display: "flex", justifyContent: "center" }} marginTop={2}>
          <StyledButton1
            variant="contained"
            endIcon={<ExpandMoreIcon style={{ fontSize: "24px" }} />}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Load More
          </StyledButton1>
        </Box>
      )}
    </Box>
  );
};

export default Times;
