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
import moment from 'moment';

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
    alignItems="center"
    paddingY={1.5}
    paddingX={2}
    sx={{
      backgroundColor: index % 2 === 0 ? "white" : "#FCFBFB",
      borderRadius: "4px",
      marginY: 0.5,
    }}
  >
    <Grid item xs={5} sm={3}>
      <StyledTypography2
        color={colors.neutral900}
        sx={{ whiteSpace: "nowrap" }}
      >
        {date}
      </StyledTypography2>
    </Grid>
    <Grid item xs={7} sm={9}>
      <StyledTypography2 color={colors.neutral900}>
        {event}
      </StyledTypography2>
    </Grid>
  </Grid>
);



const DetailedTimelineModal = ({timelineOpen,setTimelineOpen,data}) => {
  
const handleClose=()=>{
  setTimelineOpen(false)
}
  return (
    <Modal
      open={timelineOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 12000, border: "none", outline: "none" }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <StyledBox>
        <Box
          bgcolor={colors.white}
          width={{ xs: "90vw", sm: "65vw", md: "600px" }}
          sx={{
            minHeight:"80vh",
            maxHeight: "80vh",
            overflow: "hidden",
            pr: 1,
           position:"relative",
           borderRadius:1
          }}
        >
         <IconButton
      sx={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}
      onClick={handleClose}
    >
      <CloseIcon sx={{ color: colors.black }} />
    </IconButton>

          <Grid container>
          <Grid item width="100%" py={2} px={{ xs: "12px", sm: "36px" }}>
  <StyledTypography1 textAlign="center" mb="20px">
    Detailed Timeline
  </StyledTypography1>

  <Box
    sx={{
      position: "relative", 
      maxHeight: "60vh",
      overflowY: "auto",
      pr: 1,
      scrollbarWidth: "thin",
      scrollbarColor: `${colors.neutral600} transparent`,
      "&::-webkit-scrollbar": {
        width: "2px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: colors.neutral600,
        borderRadius: "10px",
      },
    }}
  >
    

    {data?.map((item, index) => (
      <TimelineRow
        key={index}
        date={moment(item.date).format("Do MMM YY")}
        event={item?.title}
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
