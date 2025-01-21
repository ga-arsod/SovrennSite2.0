"use client";
import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";
import { getWatchlistApi } from "../Redux/Slices/watchlistSlice";
import { useSelector } from "react-redux";
import WatchlistTable from "../../components/Watchlist/WatchlistTable"
import WatchlistEditModal from "../../components/Modal/WatchlistEditModal"
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WatchlistCard from "../../components/Cards/WatchlistCard"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { toggleEditModal } from "../Redux/Slices/watchlistSlice";
import Snackbar from "../../components/Snackbar/SnackBar"
import EmptyWatchlist from "../../components/Watchlist/EmptyWatchlist";
import { useRouter } from "next/navigation";
import NoLogin from "../../components/Auth/NoLogin";

const StyledTypography1 = styled(Typography)`
  font-size: 44px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.04em;
   @media (max-width: 639px) {
    font-size: 30px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const WatchlistMainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [companyData,setCompanyData]=useState({})
  const router=useRouter()
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch=useDispatch();
  const { watchlistData,isEditModalOpen } = useSelector((state) => state.watchlist);
  const [open,setOpen]=useState(false);
const { isAuth } = useSelector((store) => store.auth);

  const handleBackClick = () => {
    router.back();  
  };

  useEffect(()=>{
    dispatch(getWatchlistApi())
  },[])

  useEffect(() => {
     
    if (typeof window !== "undefined") {
      document.title ="My Watchlist";
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/self-help`;
      }
    }
  }, []);

  if (!isAuth) {
    return <NoLogin />;
  }
  return (
    <>
    
      <WatchlistEditModal isOpen={isEditModalOpen}   company={companyData} />
      <Container>
      
        <Grid container justifyContent="space-between" alignItems="center" marginTop={{xs:"70px",sm:"104px"}} spacing={isSmallerThanMd ? 2 : 0}>
        <Snackbar/>
       
          <Grid item xs={12} md={6}>
            <Box marginBottom={1} display="flex" alignItems="center">
              {isSmallerThanMd && (
                <ArrowBackIcon
                  sx={{
                    fontSize: 28,
                    marginRight: { xs: 1, sm: 2 },
                    color: colors.navyBlue500,
                  }}
                  onClick={handleBackClick}
                />
              )}
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
                My
              </StyledTypography1>
              <StyledTypography1
                color={theme.palette.primary.main}
                component="span"
              >
               Watchlist
              </StyledTypography1>
            </Box>
          </Grid>
          
        </Grid>
        {
          watchlistData.length==0 ? <EmptyWatchlist/> : isSmallerThanMd ? <WatchlistCard  data={watchlistData} setCompanyData={setCompanyData}/> : <WatchlistTable data={watchlistData} setCompanyData={setCompanyData}/>
        }
       
        
      </Container>
    </>
  );
};

export default WatchlistMainPage;