import React, { useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { timesPdfListApi } from "@/app/Redux/Slices/timesSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NoData from "../NoData/NoData";

const StyledBox = styled(Box)({
  padding: "16px",
  backgroundColor: "#F1F5F9",
  borderRadius: "8px",
  marginBottom: "16px",
});

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 17px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.02em;
  }
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 8px 24px;

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

const ArticleBanner = ({ filterData2, page2, setPage2 }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { timesPdfList,pagination } = useSelector((store) => store.times);
   const { isAuth } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(timesPdfListApi({page:page2,data:{}}));
  }, [isAuth]);

  if(!timesPdfList.length)
  {
    return(
    <NoData text="No data available" />
  )
  }
  return (
    <>
   
      {timesPdfList?.map((elem, index) => (
        <StyledBox key={index}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <StyledTypography1
                color={colors.greyBlue500}
                marginRight={1}
                component="span"
              >
                {`Sovrenn Times-`}
              </StyledTypography1>
              <StyledTypography1 color="black" component="span">
                {moment(elem?.date).format("Do MMMM YYYY")}
              </StyledTypography1>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              justifyContent={{ xs: "flex-end", sm: "flex-end" }}
            >
              <Link
                href={`/times/read-pdf?path=${elem?.pdf_file_key}`}
                target="_blank"
              >
                <StyledButton1 variant="contained">Read Now</StyledButton1>
              </Link>
            </Grid>
          </Grid>
        </StyledBox>
      ))}
      {pagination?.total_pages === pagination?.page ||
      !Object.keys(timesPdfList)?.length ? (
        ""
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          marginBottom={6}
        >
          <StyledButton2
            variant="contained"
            onClick={() => {
              dispatch(timesPdfListApi({page:page2 + 1,data:filterData2}));
              setPage2(page2 + 1);
            }}
          >
            Load More
          </StyledButton2>
        </Box>
      )}
    </>
  );
};

export default ArticleBanner;
