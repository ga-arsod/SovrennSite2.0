import React from "react";
import { Card, CardContent, Typography, Button, Box,useTheme,useMediaQuery } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { styled } from "@mui/material/styles";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import Link from "next/link";
import { colors } from "../Constants/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { getPulseDataApi } from "@/app/Redux/Slices/searchSlice";
import { useDispatch } from "react-redux";


const StyledTypographyFileLink = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  
`;

const FileLinkButton = styled(Button)`
  background-color: ${colors.green50};
  text-transform: none;
  color: ${colors.themeGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 6px 16px;
  min-width: 120px;
  &:hover {
    color: white;
    background-color: ${colors.themeButtonHover};

   
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
const StyledButton2 = styled(Button)`
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
const PulseCard = ({ data }) => {
  const [page,setPage]=useState(1)
  const dispatch=useDispatch()
   const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
   const company_summary = useSelector((store) => store.search.companySummary);
    const {pulsePagination} = useSelector((store) => store.search);
     useEffect(()=>{
       dispatch(getPulseDataApi({company_id:company_summary?._id,page:page}))
      },[page])
  return (
    <Box mb={5}>
      <StyledTypography1 color={colors.navyBlue500} my={2}>
        Pulse
      </StyledTypography1>

      {data?.map((elem, index) => {
        return (
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, px: 1, py: 1.5, mb: 2 }}
            key={index}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <StyledTypography2 color={colors.navyBlue500}>
                  {moment(elem?.news_date).format("Do MMM YYYY")} |{" "}
                  {moment(elem?.news_date).format("LT")}
                </StyledTypography2>

                {
                  !isXs && <Link
                  href={elem?.file_url}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                    <StyledTypographyFileLink  sx={{ color: "inherit" }}>
                      File Link
                    </StyledTypographyFileLink>
                  </FileLinkButton>
                </Link>}
              </Box>

              <StyledTypography3 color={colors.neutral800} mt={2}>
                {elem?.ai_summary}
              </StyledTypography3>
               {isXs && (
                         <Box mt={2} display="flex" justifyContent="flex-end">
                             <Link
                  href={elem?.file_url}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                    <StyledTypographyFileLink  sx={{ color: "inherit" }}>
                      File Link
                    </StyledTypographyFileLink>
                  </FileLinkButton>
                </Link>
                          </Box>
                        )}
            </CardContent>
          </Card>
        );
      })}
      {
        pulsePagination?.total_pages === pulsePagination?.page  ? "" :
        <Box
        sx={{ display: "flex", justifyContent: "center" }}
       
        marginTop={2}
      >
        <StyledButton2
          variant="contained"
          endIcon={<ExpandMoreIcon style={{ fontSize: "24px" }} />}
          onClick={()=>{setPage(page+1)}}
        >
          Load More
        </StyledButton2>
      </Box>
      }
      
    </Box>
  );
};

export default PulseCard;
