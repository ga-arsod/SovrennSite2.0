"use client";
import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { colors } from "../Constants/colors";


const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 19px;
    font-weight: 600;
    line-height: 23px;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  
`;



const TimelineRow = ({ date, event, index }) => (
    <Grid
      container
     gap={{xs:3,sm:5}}
      alignItems="center"
      paddingY={1.5}
      paddingX={2}
      sx={{
        backgroundColor: index % 2 === 0 ? "white" : "#FCFBFB", // alternating
        borderRadius: "4px",
        marginY: 0.5,
      }}
    >
      <Grid item>
        <StyledTypography2 color={colors.neutral900}>{date}</StyledTypography2>
      </Grid>
      <Grid item>
        <StyledTypography2 color={colors.neutral900}>{event}</StyledTypography2>
      </Grid>
    </Grid>
  );
  

const DetailedTimelineModal = () => {
  const timelineData = [
    { date: "2nd Jun", event: "Basics of investing" },
    { date: "7th Jun", event: "1st Doubt clearing session" },
    { date: "2nd Jun", event: "Basics of investing" },
    { date: "7th Jun", event: "1st Doubt clearing session" },
    { date: "2nd Jun", event: "Basics of investing" },
    { date: "7th Jun", event: "1st Doubt clearing session" },
    { date: "2nd Jun", event: "Basics of investing" },
    { date: "7th Jun", event: "1st Doubt clearing session" },
  ];

  return (
    <Modal
    open={true}
    //   onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={{ zIndex: 12000, border: "none", outline: "none" }}
    BackdropProps={{
      sx: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        border: "none",
        outline: "none",
      },
    }}
  >
    <StyledBox>
      <Box
        bgcolor={colors.white}
        width={{ xs: "90vw", sm: "65vw", md: "600px" }}
        height="auto"
        sx={{
          boxShadow: "0px 12px 24px 0px #0000001A",
          position: "relative",
          borderRadius: "8px",
          border: "none",
          outline: "none",
        }}
      >
        <IconButton
          // onClick={handleClose}
          sx={{ position: "absolute", top: "6px", right: "4px" }}
        >
          <CloseIcon sx={{ color: colors.black }} />
        </IconButton>
        <Grid container>
        <Grid item width="100%" py={2} px={{xs:"12px",sm:"36px"}} >
        <StyledTypography1 textAlign="center" mb="20px">Detailed Timeline</StyledTypography1>
        
        <Box>
  {timelineData.map((item, index) => (
    <TimelineRow
      key={index}
      date={item.date}
      event={item.event}
      index={index}
    />
  ))}
</Box>
        </Grid>
        </Grid>
       
      </Box>
           </StyledBox>
         </Modal>
  );
};

export default DetailedTimelineModal;
