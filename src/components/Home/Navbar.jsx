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

const navItems = [
  "Education",
  "Times",
  "Prime",
  "Discovery",
  "IPO",
  "Knowledge",
  "Self Help",
  "Pricing",
];

const StyledListItemText = styled(ListItemText)`
  && {
    color: #0d1726;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
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
  @media (max-width: 500px) {
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
  background-color: #1da098;
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
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) return null;

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          position: "fixed",
          zIndex: 10,
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
              <IconButton
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </StyledGrid3>
            <StyledGrid1 item>
              <Box>
                <List
                  sx={{ display: "flex", flexDirection: "row", padding: 0 }}
                >
                  {navItems.map((item) => {
                    return (
                      <ListItem
                        onClick={() => {
                          setOpen(false);
                        }}
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
                    );
                  })}
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
              <IconButton
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </StyledGrid4>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        ModalProps={{ hideBackdrop: true }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="top"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            top: "64px",
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
            {navItems.map((item) => {
              return (
                <ListItem
                  key={item}
                  sx={{
                    px: 1,
                    whiteSpace: "nowrap",

                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <StyledListItemText primary={item}></StyledListItemText>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
