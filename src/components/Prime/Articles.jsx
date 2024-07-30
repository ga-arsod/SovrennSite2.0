"use client";
import styled from "@emotion/styled";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { CalendarToday, PlayCircleOutline } from "@mui/icons-material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Comments from "../../components/Prime/Comments"
import Snackbar from "../Snackbar/SnackBar"

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.02em;
`;
const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.02em;
  color:black;
`;

const Article = () => {
  return (
    <>
    <Box sx={{ maxWidth: 915, margin: "64px auto", padding: 2 }}>
  
      <StyledTypography1>
        NETWORK PEOPLE SERVICE TECHNOLOGIES LIMITED
      </StyledTypography1>
     <Divider sx={{marginTop:3,marginBottom:1}}/>
      <Box sx={{ display: "flex", alignItems: "center" }}>
    

        <Box sx={{ display: "flex", alignItems: "center", marginRight: 3,cursor:'pointer' }}>
          <CalendarToday sx={{ marginRight: 1 }} />
          <StyledTypography2>17th Oct 23</StyledTypography2>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 3,cursor:'pointer' }}>
          <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: 1 }} />
          <StyledTypography2>2 Comments</StyledTypography2>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center",cursor:'pointer' }}>
          <PlayCircleOutline sx={{ marginRight: 1 }} />
          <StyledTypography2>Stop Audio</StyledTypography2>
        </Box>
      
      </Box>
      <Divider sx={{marginTop:1}}/>
    </Box>
  <Comments/>
    </>
  );
};

export default Article;
