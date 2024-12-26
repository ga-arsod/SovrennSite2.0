"use client";
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors'; 
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useRouter } from 'next/navigation';


const ArrowBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #29343C',
  width: '30px',
  height: '30px',
  borderRadius: '8px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  
  [theme.breakpoints.down('xs')]: {
    width: '20px',
    height: '20px',
  },
}));

const StyledArrowForwardIcon = styled(ArrowForwardIcon)(({ theme }) => ({
  fontSize: '14px',
  color: colors.navyBlue500,
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px', 
  },
}));

const StyledArrowBackIcon = styled(ArrowBackIcon)(({ theme }) => ({
  fontSize: '14px',
  color: colors.navyBlue500,
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px', 
  },
}));

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.02em;
`;

const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: '5px',
    backgroundColor: colors.themeGreen,
    width: '100%',
    '@media (max-width:639px)': {
      height: '2px',
    },
  },
  '& .MuiButtonBase-root.MuiTab-root:nth-of-type(2)': {
    maxWidth: 'none',
  }
}));

const TabLabel = ({ text, isActive }) => {
  const words = text.split(' ');

  return (
    <Box display="flex" alignItems="center">
      {words.map((word, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            color: isActive
              ? index === 0
                ? colors.navyBlue500
                : colors.themeGreen
              : colors.neutral700,
            fontWeight: '600',
            fontSize: { xs: '16px', sm: '38px', md: '44px' },
            lineHeight: { xs: '19px', sm: '56px' },
            letterSpacing: { xs: 0, sm: '-0.04em' },
            whiteSpace: 'nowrap',
            marginRight: index === 0 || 1 ? { xs: '0.3rem', sm: '0.5rem' } : '0',
          }}
        >
          {word}
        </Typography>
      ))}
    </Box>
  );
};

const PrimeHeading = ({ setActiveTab }) => {
  const [value, setValue] = useState('one');
  const theme = useTheme();
  const router=useRouter();

  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveTab(newValue);
  };

  const handleBackClick = () => {
    router.back();  
  };

  const handleArrowClick = () => {
    if ( value === 'two') {
      setValue('one');
      setActiveTab('one');
    } else if ( value === 'one') {
      setValue('two');
      setActiveTab('two');
    }
  };

  return (
   
      <Box sx={{ width: '100%' }} marginTop={{xs:"70px",sm:"90px"}}>
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            width: { xs: '100%', sm: 'auto' },  
            overflowX: 'auto',  
          }}
        >
          {isSmallerThanMd && (
            <StyledArrowBackIcon 
              sx={{
                position: 'absolute',
                left: { xs: 'calc(2% - 10px)', sm: 'calc(1% - 10px)', md: 'calc(5% - 20px)' },
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: { xs: '20px', sm: '24px' },
                color: colors.navyBlue500,
              }}
              onClick={handleBackClick}
            />
          )}
          <CustomTabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            sx={{
              marginLeft: { xs: '30px', sm: '30px', md: 0 }, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& .MuiTabs-flexContainer': {
                gap: { xs: "20px", sm: "50px", md: "110px" },  
                position: 'relative',
              },
              '& .MuiTab-root': {
                padding: 0,
                minWidth: 'auto',
                overflow: 'visible',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              },
            }}
          >
            <Tab
              value="one"
              label={<TabLabel text="Prime Articles" isActive={value === 'one'} />}
              sx={{
                textTransform: 'none',
                minWidth: 'auto',
                px: 0,
                overflow: 'visible',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            />
            {!isSmallerThanSm && (
              <ArrowBoxContainer
                sx={{
                  left: { xs: 'calc(50%)', sm: 'calc(40%)', md: 'calc(40%)' }, 
                  transform: 'translateX(-50%)',
                  cursor:'pointer'
                }}
                onClick={handleArrowClick}
              >
                <StyledArrowForwardIcon />
                <StyledArrowBackIcon />
              </ArrowBoxContainer>
            )}
            <Tab
              value="two"
              label={<TabLabel text="Promoter Interviews" isActive={value === 'two'} />}
              sx={{
                textTransform: 'none',
                minWidth: 'auto',
                px: 0,
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
              }}
            />
          </CustomTabs>
        </Box>
      </Box>
    
  );
};

export default PrimeHeading;