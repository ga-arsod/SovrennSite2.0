"use client";
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

const navItems = [
  "Sign Up",
  "Login",
  "Education",
  "Times",
  "Prime",
  "Discovery",
  "IPO",
  "Knowledge",
  "Self Help",
  "Pricing",
];

const StyledListItem = styled(ListItem)`
  position: relative;
  width: 100%;
  &:first-of-type .MuiTypography-root {
    color: ${colors.themeGreen};
  }
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom:0;
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
  @media (min-width: 501px) and (max-width: 1120px) {
    display: none;
  }
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

const Navbar = () => {
  const theme = useTheme();
  const isGreaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

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

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#F4F6F8",
          boxShadow: "none",
          position: "fixed",
          zIndex: 11200,
        }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
          >
            <StyledGrid1 item>
              <Image src="/logo.svg" width={146} height={30} alt="logo" />
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
                    <ListItem
                      onClick={() => setOpen(false)}
                      key={item}
                      sx={{
                        px: 1,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                    >
                      <StyledListItemText primary={item}></StyledListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </StyledGrid1>
            <StyledGrid2 item>
              <Image src="/logo.svg" width={136} height={30} alt="logo" />
            </StyledGrid2>
            <StyledGrid1 item width="30%">
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
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
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
                }}
              >
                <Typography color="white">R</Typography>
              </Box>
              <IconButton>
                <KeyboardArrowDownOutlinedIcon />
              </IconButton>
            </StyledGrid1>
            <StyledGrid3 item>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <StyledButton1 variant="contained">Sign Up</StyledButton1>
              <StyledButton2 variant="contained" disableElevation>
                Login
              </StyledButton2>
            </StyledGrid3>
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
            {filteredNavItems.map((item) => (
              <StyledListItem
                key={item}
                sx={{
                  px: 1,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
                onClick={toggleDrawer}
              >
                <StyledListItemText primary={item}></StyledListItemText>
              </StyledListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;