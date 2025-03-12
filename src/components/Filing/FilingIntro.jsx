"use client"
import { Box, Typography, Button, Grid, List, ListItem, Container, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import Image from 'next/image';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";
import { useSelector } from 'react-redux';
import LoginModal from '../Modal/LoginModal';
import { useState ,useEffect} from 'react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';





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
width:100%;
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;



const listItemTextStyles = {
  fontSize: {
    xs: "12px", 
    sm: "20px", 
  },
  lineHeight: {
    xs: "14px",
    sm: "24px",
  },
  color: "navyBlue300", 
};

export default function FilingIntro() {
    const { isAuth } = useSelector((store) => store.auth);
    const [isOpen,setIsOpen]=useState(false)
    const router=useRouter();
    const handleClose=()=>{ setIsOpen(false) }
 
   
    useEffect(()=>{},[isAuth]);

  return (
    <>
   <LoginModal isOpen={isOpen} handleClose={handleClose}/>
    <Box sx={{marginBottom:"160px",marginTop:6}}>
    
      <Box display="flex" flexDirection={{xs:"column",md:"row"}} sx={{ maxWidth: { xs: '100%',sm:"80%", md: '960px' }, margin: '0 auto' }}>
      <Box 
        flex="1" 
        sx={{ 
          width: { xs: "100%", md: "50%" }, 
          height: "auto", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          overflow: "hidden", 
          position: "relative" 
        }}
      >
        <Image
          src="/filing.png"
          alt="filing illustration"
          width={435}
          height={420}
          style={{
            width: "100%", 
            height: "auto", 
            objectFit: "contain"
          }}
        />
      </Box>

      <Box flex="1" pl={{xs:0,sm:4}}>
          <Box mt={4}>
            <Typography fontWeight="700" textAlign="center" color="#1C1C1C" sx={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}>
              This is how it works
            </Typography>
            <List>
              {[
                "Click on “Set Alert”, now add keywords for which you want to be notified",
                "You will receive notifications whenever your keyword is mentioned in any filing",
                "Come back to “My Filing” page to see all the filings containing your keywords."
              ].map((text, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#E8F6F5", color: colors.themeGreen,fontSize:{xs:"12px",sm:"20px"},width:{xs:"30px",sm:"40px"},height:{xs:"30px",sm:"40px"} }}>
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
                <Link href="/filing/alert" style={{width:"100%"}}>
                  <StyledButton variant="contained" fullWidth >
                    Set Up Now
                  </StyledButton>
                </Link>
                :
                <StyledButton variant="contained" fullWidth onClick={()=>{setIsOpen(true)}} >
                  Set Up Now
                </StyledButton>
            }
          </Box>
      </Box>
      </Box>

    </Box>
      
    </>
  );
}
