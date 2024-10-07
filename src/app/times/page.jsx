"use client"
import React ,{useState} from 'react'
import { Grid,Typography,Button,Box,Container } from '@mui/material';
import styled from "@emotion/styled";
import { colors } from '../../components/Constants/colors';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TimesFilter from "../../components/Common/TimesFilter"


import TimesHeader from "../../components/Times/TimesHeader"

const StyledTypography1=styled(Typography)`
font-weight:600;
font-size:14px;
line-height:17px;

`

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.navyBlue500};
  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
  }
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  
  :hover {
    background-color: ${colors.themeButtonHover};
  }
 
`;

const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
  && {
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;

const Times = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };
  return (
   <>
   
   <Grid container marginTop="60px" flexDirection="column">
    <Grid item paddingY={1.5}  sx={{backgroundColor:'#FCE1B3',display:"flex",justifyContent:'center',alignItems:'center'}} width="100%">
        <Box width="1200px" sx={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
        <StyledTypography1 >You are only reading free Sovrenn Times Monday articles. To read daily Sovrenn Times articles, you need to buy a plan.</StyledTypography1>
        <StyledButton2 variant="contained">
                    Buy Full Access @ ₹5000/yr
                  </StyledButton2>
                  </Box>
    </Grid>
    <Grid item>
    <TimesHeader/>
    </Grid>
    <Grid item marginTop={5}>
      <Container>
    <StyledButton
            variant="outlined"
            endIcon={<StyledFilterIcon />}
            size="small"
            onClick={toggleDrawer(true)}
          >
            Filter
          </StyledButton>
          </Container>
    </Grid>

   </Grid>
  
   <TimesFilter isOpen={isOpen} setIsOpen={setIsOpen}/>
   </>
  )
}

export default Times;
