"use client"
import { Box, Typography, Button, Grid, List, ListItem, Container, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import Image from 'next/image';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";
import { useSelector } from 'react-redux';
import LoginModal from '../Modal/LoginModal';
import { useState ,useEffect} from 'react';
import Link from 'next/link';

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: -0.04em;

   @media (max-width: 639px) {
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
 font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  letter-spacing: 0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0.02em;
  }
 
 
`;
const StyledButton = styled(Button)`
  border-color: ${colors.themeGreen};
color: white;
font-weight: 600;
font-size: 18px;
line-height: 21px;
padding-top: 14px;
padding-bottom: 14px;
text-transform: none;
background-color: ${colors.themeGreen};

:hover {
  background-color: ${colors.themeButtonHover};
  color: white;
  border-color: ${colors.themeButtonHover};
  outline: ${colors.themeButtonHover};
}

`;
const handleClose = () => {
    setIsOpen(false);
  };

const listItemTextStyles = {
  fontSize: "19px",      
  lineHeight: "24px",    
  color: colors.navyBlue300,  
};

export default function Portfolio() {
    const { isAuth } = useSelector((store) => store.auth);
    const [isOpen,setIsOpen]=useState(false)
    
    const handleClose=()=>{
        setIsOpen(false)
    }

    useEffect(()=>{

    },[isAuth])
  return (
    <>
    <LoginModal isOpen={isOpen} handleClose={handleClose}/>
      <Grid container marginTop="90px">
        <Grid item>
          <StyledTypography   color={colors.navyBlue500}>
            My <span style={{ color: colors.themeGreen }}>Portfolio</span>
          </StyledTypography>
          <StyledTypography2 color={colors.navyBlue300} mt={1}>
            Receive refined updates for the stocks in your portfolio
          </StyledTypography2>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" sx={{ maxWidth: '1200px' }}>
        <Box flex="1">
          <Image
            src="/pulse-intro.png"
            alt="Portfolio illustration"
            width={640}
            height={420}
          />
        </Box>
        
      
        <Box flex="1" pl={4}>
          
        
          <Box mt={4}>
            <Typography fontWeight="700" textAlign="center" color="#1C1C1C" sx={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}>
              This is how it works
            </Typography>
            <List>
              {[
                "Discover Companies: Explore and find the companies in your investment portfolio.",
                "Add to List: Add these companies to your personalized list.",
                "Stay Informed: Receive timely updates on the latest information for the companies in your portfolio."
              ].map((text, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#E8F6F5", color: colors.themeGreen }}>
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: listItemTextStyles
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          
          
          <Box mt={4} display="flex"  width="100%">
            {
                isAuth ? 
                <Link href="/pulse/portfolio" style={{width:"100%"}}>
                <StyledButton variant="contained" fullWidth >
                Set Up Now
              </StyledButton>
              </Link>
              :
              <StyledButton variant="contained" fullWidth onClick={()=>{setIsOpen(true)}} >
               Please login to proceed
              </StyledButton>
            }
            
          </Box>
          
        </Box>
      </Box>
    </>
  );
}