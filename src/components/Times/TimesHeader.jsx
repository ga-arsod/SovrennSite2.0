"use client";
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors'; 
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Styled Components
const ArrowBoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #29343C;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const StyledArrowForwardIcon = styled(ArrowForwardIcon)`
  font-size: 14px;
  color: ${colors.navyBlue500};
`;

const StyledArrowBackIcon = styled(ArrowBackIcon)`
  font-size: 14px;
  color: ${colors.navyBlue500};
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.02em;
`;

const CustomTabs = styled(Tabs)({
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
});

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
            fontSize: { xs: '16px', sm: '38px', md: '48px' },
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

const TimesHeader = ({setActiveTab}) => {
  const [value, setValue] = useState('one');
  const theme = useTheme();
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  setActiveTab(newValue)
  };

  return (
    <>
    <Container>
      <Box sx={{ width: '100%' }} marginTop="36px">
        <Box sx={{ position: 'relative', display: 'inline-block', width: '900px' }}>
          {isSmallerThanMd && (
            <StyledArrowBackIcon 
              sx={{
                position: 'absolute',
                left: { xs: 'calc(2% - 20px)',sm: 'calc(1% - 20px)', md: 'calc(5% - 20px)' },
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: { xs: '20px', sm: '24px' },
                color: colors.navyBlue500,
              }}
            />
          )}
          <CustomTabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            sx={{
              marginLeft:{xs:'20px',sm:'20px',md:0},
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& .MuiTabs-flexContainer': {
                gap: {xs:"40px",sm:"70px",md:"110px"},
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
              label={<TabLabel text="Sovrenn Times" isActive={value === 'one'} />}
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
              <ArrowBoxContainer sx={{ left:{xs:'calc(29% )',md:'calc(40% )'} , transform: 'translateX(-50%)' }}>
                <StyledArrowForwardIcon />
                <StyledArrowBackIcon />
              </ArrowBoxContainer>
            )}
            <Tab
              value="two"
              label={<TabLabel text="Sovrenn Times PDFs" isActive={value === 'two'} />}
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
    </Container>
    </>
  );
};

export default TimesHeader;