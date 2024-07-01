"use client"
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  Grid,
  ListItemText,
  InputBase,
  IconButton,
  Drawer,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../Constants/colors";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { navItems } from "@/utils/Data";
import { useRouter } from "next/navigation";






const StyledListItem = styled(ListItem)`
   position: relative;
  width: 100%;
  
  &:not(:nth-of-type(1)) .MuiTypography-root {
    color: #0d1726;
  }
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    border-bottom: 1px solid ${colors.neutral500};
    transform: translateX(-38vw);
  }
`;

const StyledListItemText = styled(ListItemText)`
  && .MuiTypography-root {
    color: #0d1726;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: ${props => props.isFirst ? colors.themeGreen : colors.black};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: white;
  width: 100%;
  display: flex;
`;

const StyledGrid1 = styled(Grid)`

  @media (max-width: 501px) {
    display: none;
  }
`;
const StyledGrid2 = styled(Grid)`
  @media (min-width: 1120px) {
    display: none;
  }
`;
const StyledGrid3 = styled(Grid)`
  @media (min-width: 1120px) {
    display: none;
  }
  @media (max-width: 639px) {
    display: none;
  }
`;
const StyledGrid4 = styled(Grid)`
  @media (min-width: 501px) {
    display: none;
  }
`;

const SearchIconWrapper = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
`;

const StyledButton1 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color: ${colors.themeGreen};
  color: white;
  text-transform:none;
`;
const StyledButton2 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color: white;
  color: #20365b;
`;

const SearchInput = styled(InputBase)`
  color: black;
  width: 100%;
  padding: 4px 4px 4px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none; // This will remove the blue underline
  display: block;
  width: 100%;
`;
const Navbar = () => {
  const theme = useTheme();
  const isGreaterThanMd = useMediaQuery(theme.breakpoints.up('md'));
 const {isAuth,user}=useSelector((store)=>store.auth)
 const router=useRouter()

  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Filter the navItems based on screen size
  const filteredNavItems = isGreaterThanMd ? navItems.slice(2) : navItems;
console.log(isAuth,"isAuth")
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#F4F6F8",
          boxShadow: "none",
          position: "fixed",
         zIndex:1300,
        }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0}
          >
            <StyledGrid1 item>
              <Link href="/" passHref>
              <Image src="/logo.svg" width={146} height={25} alt="logo" />
              </Link>
            </StyledGrid1>
            <StyledGrid3 item>
              <IconButton onClick={toggleDrawer}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </StyledGrid3>
            <StyledGrid1 item>
              <Box>
                <List
                  sx={{ display: "flex", flexDirection: "row", padding: 0 }}
                >
                  {filteredNavItems.map((item) => (
                    <StyledLink  key={item} href={item.link} passHref>
                    <ListItem
                      onClick={() => setOpen(false)}
                     
                      sx={{
                        px: 1,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                    >
                      <StyledListItemText primary={item.name}></StyledListItemText>
                    </ListItem>
                    </StyledLink>
                  ))}
                </List>
              </Box>
            </StyledGrid1>
            <StyledGrid2 item>
              <Image src="/logo.svg" width={136} height={30} alt="logo" />
            </StyledGrid2>
            <StyledGrid1 item width="22%">
              <SearchContainer>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#64748B" }} />
                </SearchIconWrapper>
                <SearchInput
                  placeholder="Search for a company"
                  inputProps={{ "aria-label": "search" }}
                />
              </SearchContainer>
            </StyledGrid1>
            
            <StyledGrid1
              item
              sx={{ display: isAuth ? "flex":"none", alignItems: "center" }}
            >
              <Box
                sx={{
                  backgroundColor: "#172641",
                  borderRadius: "50%",
                  padding: "2px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow:"hidden"
                }}
              >
               {
                user?.profile_pic===null ?  <Typography color="white">{user?.first_name.charAt(0)}</Typography> :
                <Image src="/images.jpg" width={30} height={30} alt="logo"  sx={{ objectFit: 'cover', borderRadius: '50%' }}/>
               }
               
                
               
              </Box>
              <IconButton>
                <KeyboardArrowDownOutlinedIcon />
              </IconButton>
            </StyledGrid1>
            <StyledGrid1  item sx={{display:isAuth ? "none":"flex",alignItems:"center"}}>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <StyledButton1 sx={{marginRight:"16px"}} variant="contained" onClick={()=>{router.push("login")}}>Sign Up</StyledButton1>
              <Typography  color={colors.navyBlue500}  sx={{fontWeight:"600",fontSize:"14px",lineHeight:"17px",cursor:"pointer"}} onClick={()=>{router.push("login")}} disableElevation>
                Login
              </Typography>
            </StyledGrid1>
            <StyledGrid4 item>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer}>
                {open ? <CloseIcon sx={{ color: "black" }} /> : <MenuIcon />}
              </IconButton>
            </StyledGrid4>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            style: {
              backgroundColor: '#1C1C1C80',
            },
          },
          hideBackdrop: false
        }}
        open={open}
        onClose={toggleDrawer}
        anchor="top"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            top: "55px",
          },
        }}
      >
        <Box
          p={3}
          role="presentation"
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <List>
            {filteredNavItems.map((item,index) => (
              <StyledLink key={item} href={item.link} passHref>
              <StyledListItem
               
                sx={{
                  px: 1,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
                onClick={toggleDrawer}
              >
                <StyledListItemText primary={item.name} isFirst={index === 0}></StyledListItemText>
              </StyledListItem>
              </StyledLink>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;