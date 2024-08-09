import React,{useEffect,useState} from "react";
import { Box,Grid ,IconButton,Typography,Modal,FormControl,FormControlLabel,RadioGroup,Radio,Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
  }
`;
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
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.white};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledButton2 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    padding-top: 12px;
  padding-bottom: 12px;
  }
`;
const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiTypography-root {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    color:#101828;
   
  }
`;
const CustomRadioGroup = styled(RadioGroup)`
  & .MuiFormControlLabel-root {
    margin-bottom: -8px; 
    &:last-child {
      margin-bottom: 10px;
    }
  }
`;
const StyledRadio = styled(Radio)`
&.Mui-checked {
    color: ${colors.themeGreen}; /* Color of the checked radio button */
    & .MuiSvgIcon-root {
      color: ${colors.themeGreen}; /* Color of the radio button circle when checked */
    }
  }

  & .MuiSvgIcon-root {
    font-size: 22px; 
    color: ${colors.green50}; 
  }

  &:hover .MuiSvgIcon-root {
    color: ${colors.themeGreen}; 
  }
`;
const SlotBookingModal=({open,handleClose})=>{
  const [selectedSlot, setSelectedSlot] = useState("");
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };
    return(
        <>
        
         <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 12000,border:"none",outline:"none" }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          border: 'none',
          outline: 'none',
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
           border: 'none', 
           outline: 'none', 
         }}
        >
            <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "8px", right: "4px" }}
          >
            <CloseIcon sx={{color:colors.black}}/>
          </IconButton>
           <Grid container width="100%" padding="20px">
            <Grid item sx={{display:"flex",justifyContent:"center"}} width="100%" >
              
            <StyledTypography1>Select a Slot</StyledTypography1>
           
            </Grid>
            <Grid item marginTop={3}>
            <FormControl>
 
  <CustomRadioGroup
   aria-labelledby="demo-radio-buttons-group-label"
   value={selectedSlot}
   onChange={handleSlotChange}
   name="radio-buttons-group"
  >
    <StyledFormControlLabel value="slot1" control={<StyledRadio />} label="25th Dec 23 at 2:30 P.M." />
    <StyledFormControlLabel value="slot2" control={<StyledRadio />} label="25th Dec 23 at 2:30 P.M." />
    <StyledFormControlLabel value="slot3" control={<StyledRadio />} label="25th Dec 23 at 2:30 P.M." />
  </CustomRadioGroup>
</FormControl>
            </Grid>
            <Grid item width="100%">
              <Grid container display="flex" justifyContent="space-between" spacing={2} width="100%">
                <Grid item xs={6}>
                  <StyledButton1 variant="outlined"  onClick={handleClose}>Cancel</StyledButton1>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton2 variant="contained"  disabled={!selectedSlot}>Book Now</StyledButton2>
                </Grid>
              </Grid>
            </Grid>
            </Grid> 
        </Box>
        </StyledBox>
        </Modal>
        </>
    )
}
export default SlotBookingModal;
