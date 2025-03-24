"use client"
import React,{useState} from 'react'
import { Container,Grid,Typography,Button,Box,Tab,Tabs,Card,CardContent} from '@mui/material'
import styled from "@emotion/styled";
import { colors } from '@/components/Constants/colors';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Discovery from "../../components/Search/Discovery"
import PrimeArticle from "../../components/Search/PrimeArticle"
import Times from "../../components/Search/Times";
import Ipo from "../../components/Search/Ipo";
import Pulse from "../../components/Search/Pulse";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;



const StyledTypography3 = styled(Typography)`
  font-size: 16px;
  line-height: 19px;
`;


const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.themeGreen};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.themeGreen};
 
`;

const CustomTabs = styled(Tabs)`
  min-height: 40px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;

  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey300};
    border-radius: 3px;
  }
`;

const CustomTab = styled(Tab)`
  text-transform: none;
  min-width: 0;
  margin-right: 15px;
  font-size: 20px;
  font-weight: 600;
  line-height:24px;
  padding: 6px 10px;
  color:#BAC1CC;
  white-space: nowrap;

  &:hover {
    color: ${colors.themeGreen};
  }

  &.Mui-selected {
    color: ${colors.themeGreen};
  }
`;
const page = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (_, newValue) => {
      setSelectedTab(newValue);
    };
    console.log(selectedTab,"selected tab")
  return (
    <>
          <Container>
        <Grid
          container
          marginTop={{ xs: "90px", sm: "100px" }}
          flexDirection="column"
        >
          <Grid item>
            <StyledTypography1 color={colors.navyBlue500}>
            KPI Green Energy Limited
            </StyledTypography1>
          </Grid>
          <Grid item marginTop={3}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              direction={{ xs: "column", sm: "row" }}
            >
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Prev Close: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
               ₹506.65
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Sector: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
             Capital Goods - Electrical Equipment
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Industry: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
              Diversified
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`Market Cap: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
               ₹2533 Cr
                </StyledTypography3>
              </Grid>
              <Grid item>
                <StyledTypography3
                  color={colors.navyBlue500}
                  sx={{ fontWeight: "600" }}
                  component="span"
                >
                  {`TTM PE: `}
                </StyledTypography3>
                <StyledTypography3
                  color={colors.greyBlue500}
                  sx={{ fontWeight: "400" }}
                  component="span"
                >
               71.2x
                </StyledTypography3>
              </Grid>
            </Grid>
          </Grid>

        <Grid item>
        <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", 
        gap: 2, 
        padding: 2, 
      }}
    >
      <StyledButton variant="outlined" startIcon={<AddIcon />}>
      Add to Pulse
      </StyledButton>
      <StyledButton variant="outlined" startIcon={<BookmarkBorderIcon />}>
      Add to Watchlist
      </StyledButton>
    </Box>
        </Grid>

      
         <Grid item>
         <Box >
      {/* Tabs */}
      <CustomTabs value={selectedTab} onChange={handleTabChange} >
      <CustomTab label="All" />
        <CustomTab label="Discovery" sx={{ fontWeight: "bold" }} />
        <CustomTab label="Prime" />
        <CustomTab label="Times" />
        <CustomTab label="IPO" />
        <CustomTab label="Pulse" />
      </CustomTabs>

     
    </Box>
         </Grid>
    
  {
    selectedTab==1 ? <Discovery/> : selectedTab ==2 ? <PrimeArticle/> : selectedTab==3 ? <Times/> : selectedTab == 4 ? <Ipo/> : selectedTab == 5 ? <Pulse/> : <></>
  }
    
         

        
        </Grid>
      </Container>
    </>
  )
}

export default page
