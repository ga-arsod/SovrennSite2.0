'use client';

import React from 'react';
import { Avatar, Box, Typography, Stack, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const StyledSessionDot = styled('span')((props) => ({
  width: '20px',
  height: '8px',
  borderRadius: '4px',
  marginRight: '6px',
  backgroundColor: props.active ? colors.themeGreen : '#DEDDDD',
  display: 'inline-block',
}));

const StyledTypography1 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
 letter-spacing: 0em;
    line-height: 17px;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
   @media (max-width: 639px) {
    font-size: 14px;
 letter-spacing: 0em;
    line-height: 17px;
  }
`;
const StyledTypography3 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: 639px) {
    font-size: 14px;
 
    line-height: 17px;
  }
`;

export default function ProgressCard({data}) {
  const { isAuth,userDetails } = useSelector((store) => store.auth);
  const getFirstInitial = (name) => name.trim().charAt(0).toUpperCase();
  
  return (
    <Grid container bgcolor="E6E8E9" marginTop="56px" justifyContent="center" px={2}>
      <Box
        sx={{
          width:{xs:"100%",sm:"85%"},
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          mt: 4,
          p: 2,
          gap: 2,
        }}
      >
       
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: '#001B33', width:{xs:36,sm:60}, height:{xs:36,sm:60} }}>{getFirstInitial(userDetails?.first_name)}</Avatar>
            <Box>
              <StyledTypography1  color={colors.navyBlue300} mb={0.5}>
               {data?.header?.text}
              </StyledTypography1>
              <StyledTypography2 color={colors.navyBlue500}>
                Mentorship Dashboard
                {/* <Box component="span" sx={{ color: colors.themeGreen, fontWeight: 600 }}>
                  BMPO01
                </Box> */}
              </StyledTypography2>
            </Box>
          </Stack>
        </Box>

       
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box textAlign="left">
            <StyledTypography1 color={colors.neutral900} display="flex" alignItems="center" mb={{xs:"12px",sm:'20px'}}>
              <AccessTimeFilledIcon sx={{ fontSize: 16, mr: '4px' }} />
             {data?.progress?.title}
            </StyledTypography1>

            <Box display="flex" mb="4px">
              {Array.from({ length: data?.progress?.total_sessions }).map((_, i) => (
                <StyledSessionDot key={i} active={i < data?.progress?.completed_sessions} />
              ))}
            </Box>

            <StyledTypography3 color="#9E9E9E"  display="flex" alignItems="center" mt={1}>
              <CheckCircleIcon sx={{ fontSize: 18,color:colors.themeGreen, mr: '4px' }} />
              <span style={{color:data?.progress?.completed_sessions < 1 ? "#9E9E9E" : colors.themeGreen,marginRight:"4px"}}>{`${data?.progress?.completed_sessions} `}</span> of {data?.progress?.total_sessions} sessions completed
            </StyledTypography3>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
