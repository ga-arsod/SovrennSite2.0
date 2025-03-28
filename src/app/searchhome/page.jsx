"use client"
import React,{useEffect, useState} from 'react'
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
import { getCompanyDataApi } from '../Redux/Slices/searchSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
const SearchHome = () => {
   const [selectedTab,setSelectedTab] = useState(0)
    const company_summary= useSelector((store) => store.search.companySummary);
    
   const dispatch= useDispatch();
   const searchParams = useSearchParams();
     const q = searchParams.get("q");

    const handleTabChange = (_, newValue) => {
      setSelectedTab(newValue);
    };
   useEffect(()=>{
    dispatch(getCompanyDataApi(q))
   },[q])

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
           {company_summary?.company_name}
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
             {company_summary?.share_price}
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
            {company_summary?.sector}
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
             {company_summary?.industry}
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
              {company_summary?.market_cap}
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
              {company_summary?.ttm_pe}
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
      <StyledButton variant="outlined" startIcon={<AddIcon />} color={company_summary?.is_added_in_pulse ? colors.red500 : colors.themeGreen }>
      {company_summary?.is_added_in_pulse ? "Remove from Pulse" : "Add to Pulse"}
      </StyledButton>
      <StyledButton variant="outlined" color={company_summary?.is_added_in_pulse ? colors.red500 : colors.themeGreen } startIcon={<BookmarkBorderIcon />}>
      {company_summary?.is_added_in_watchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </StyledButton>
    </Box>
        </Grid>

      
         <Grid item>
         <Box >
      {/* Tabs */}
      <CustomTabs value={selectedTab} onChange={handleTabChange} >
      <CustomTab label="All" />
      {
        company_summary?.is_in_discovery ?  <CustomTab label="Discovery" sx={{ fontWeight: "bold" }} /> : <></>
      }
       {
        company_summary?.is_in_prime ?   <CustomTab label="Prime" /> : <></>
      }
        {
        company_summary?.is_in_times ?   <CustomTab label="Times" /> : <></>
      }
        {
        company_summary?.is_in_ipo ?   <CustomTab label="IPO" /> : <></>
      }
      {
        company_summary?.is_in_pulse ?   <CustomTab label="Pulse" /> : <></>
      }
        
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

export default SearchHome;
