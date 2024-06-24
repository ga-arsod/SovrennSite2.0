"use client"
import React ,{useState} from 'react'
import { Box,Grid,IconButton,Typography } from '@mui/material'
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px; /* Row gap, Column gap */

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr); /* 4 items per row on desktop */
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 items per row on tablet */
  }

  @media (max-width: 639px) {
    flex: 1 1 100%;
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.black};
`;

const StyledTypography2 = styled(Typography)`
 
  font-size: 14px;
  line-height: 17px;
`;

const StyledGrid = styled(Box)`
  cursor: pointer;
  background-color: ${colors.navyBlue50};
  border-radius: 3px;
 

  &:hover {
    background-color: ${colors.green50};
  }

 
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
  @media (max-width: 639px) {
    font-size: 23px;
  line-height: 28px;
  }
`;

const HoverBox = styled(Box)`
  background-color: #F6F5F5;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral900};

    .header-text {
      color: ${colors.white}; /* Change text color on hover */
    }

    .header-icon {
      color: ${colors.white}; /* Change arrow color on hover */
    }
  }

  &.collapsed {
    background-color: ${colors.neutral400}; /* Color when collapsed */

    .header-text {
      color: ${colors.navyBlue900}; /* Text color when collapsed */
    }

    .header-icon {
      color: ${colors.navyBlue900}; /* Icon color when collapsed */
    }

    &:hover {
      background-color: ${colors.neutral900};

      .header-text {
        color: ${colors.white}; /* Text color on hover when collapsed */
      }

      .header-icon {
        color: ${colors.white}; /* Icon color on hover when collapsed */
      }
    }
  }
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #B0B7BC;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s; /* Add transition for all properties */

  &:hover {
    background-color: ${colors.themeGreen}; /* Change background color on hover */
    border-color: ${colors.navyBlue900}; /* Change border color on hover */
    transform: rotate(-45deg); /* Rotate icon by 45 degrees anticlockwise on hover */

    .arrow-icon {
      color: ${colors.white}; /* Change arrow color on hover */
    }
  }
`;

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; visibility: hidden; }
    to { opacity: 1; visibility: visible; }
  }
`;

const fadeOut = `
  @keyframes fadeOut {
    from { opacity: 1; visibility: visible; }
    to { opacity: 0; visibility: hidden; }
  }
`;


const CustomDiscoveryCard = ({title}) => {
    const [isGridOpen, setIsGridOpen] = useState(true); // State to control the collapse

    const handleToggle = () => {
      setIsGridOpen(!isGridOpen);
    };
    
  return (
   <>
   <Box marginBottom={6}>
        <HoverBox
          onClick={handleToggle}
          className={isGridOpen ? '' : 'collapsed'}
        >
          <Grid container justifyContent="space-between" paddingY={1} paddingX="12px" alignItems="center">
            <Grid item>
              <StyledTypography3 className="header-text">{title}</StyledTypography3>
            </Grid>
            <Grid item>
              <IconButton>
                {isGridOpen ? (
                  <KeyboardArrowUpIcon sx={{ color: colors.navyBlue900 }} fontSize='large' className="header-icon" />
                ) : (
                  <KeyboardArrowDownIcon sx={{ color: colors.navyBlue900 }} fontSize='large' className="header-icon" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </HoverBox>
        {isGridOpen && (
          <GridContainer className='fade-in'>
            {
              Array.from("abcedfghij").map((item, index) => {
                return (
                  <StyledGrid key={index}>
                    <Box sx={{display:'flex',justifyContent:"flex-end",alignItems:'center'}} paddingX="4px" >
                        <IconButton sx={{paddingX:"0px"}}><DeleteOutlineIcon sx={{color:colors.red500,fontSize:"18px"}}/></IconButton>
                        <Typography color={colors.red500} sx={{fontWeight:600,fontSize:"14px",lineHeight:"17px"}}>Delete</Typography>
                    </Box>
                    <Grid container>
                      <Grid item paddingY={0} paddingX="20px" width="100%">
                        <Box
                          sx={{
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <Image
                            src="/custombucket.svg"
                            width={274}
                            height={140}
                            alt="poster"
                            layout="responsive"
                          />
                        </Box>
                      </Grid>
                      <Grid item paddingX="20px">
                        <StyledTypography1 gutterBottom>
                        New Bucket list
                        </StyledTypography1>
                        <StyledTypography2 color={colors.navyBlue400} sx={{fontWeight:500}} marginBottom={5}>
                        This is a new bucket
                        </StyledTypography2>
                      </Grid>
                      <Grid item width="100%" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} paddingX="20px" marginY={2} >
                        <StyledTypography2 component="span" color={colors.themeGreen} sx={{fontWeight:600}}>187 Companies are in this bucket</StyledTypography2>
                        <CustomIconButton>
                          <ArrowForwardIcon fontSize='small' className="arrow-icon" sx={{ color: "#3C464F" }} />
                        </CustomIconButton>
                      </Grid>
                    </Grid>
                  </StyledGrid>
                )
              })
            }
          </GridContainer>
        )}
      </Box>
   </>
  )
}

export default CustomDiscoveryCard
