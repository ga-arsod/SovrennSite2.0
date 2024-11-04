"use client";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  Button,
  List,
  ListItem,
  Grid,
  ListItemText,
  InputBase,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  
  TextField,
 
} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname } from "next/navigation";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../Constants/colors";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { navItems } from "@/utils/Data";
import { useRouter } from "next/navigation";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { doLogout } from "../../app/actions/index";
import { logout } from "@/app/Redux/Slices/authSlice";
import { userDetailsApi } from "@/app/Redux/Slices/authSlice";
import NavbarSearch from "../Home/NavbarSearch"
import { googleLogin } from "@/app/Redux/Slices/authSlice";







const StyledListItemText = styled(ListItemText)`
  && .MuiTypography-root {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: ${(props) => (props.isFirst ? (props.isXsOrSm ? colors.themeGreen : colors.black) : colors.black)};
  }
`;

const StyledGrid1 = styled(Grid)`
  @media (max-width: 1024px) {
    display: none;
  }
`;
const StyledGrid5 = styled(Grid)`
  @media (max-width: 639px) {
    display: none;
  }
`;

const StyledGrid2 = styled(Grid)`
  @media (min-width: 1120px) {
    display: none;
  }
`;

const StyledGrid3 = styled(Grid)`
  @media (min-width: 1040px) {
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

const StyledButton1 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color: ${colors.themeGreen};
  color: white;
  text-transform: none;
`;



const StyledMenuItem = styled(MenuItem)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: black;
`;

const StyledMenuItem2 = styled(MenuItem)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #f83a3a;
`;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "white",
      },
    },
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'black',
    boxShadow: "0px 2px 7px 0px #0000001F"
    ,
    fontSize: "12px",
    lineHeight:"14px",
    
  },
  [`& .MuiTooltip-arrow`]: {
    color: 'white',
  },
}));

const TooltipContent = ({ heading, description }) => (
  <Box>
    <Typography variant="body2" fontWeight="bold">
      {heading}
    </Typography>
    <Typography color="black" variant="body2">{description}</Typography>
  </Box>
);

const Navbar = ({ session }) => {
  const theme = useTheme();
  const isGreaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isGeaterThanSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { isAuth, user } = useSelector((store) => store.auth);
  const router = useRouter();
  const pathname=usePathname();
  const isXsOrSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    setIsLoaded(true)
    dispatch(userDetailsApi())
  },[dispatch,isAuth,pathname])
 
 
  // useEffect(() => {
  //  if(session)
  //  {
   
  //     localStorage.setItem("token", session.accessToken);
  
  //   dispatch(googleLogin())
  //  }
    
  // }, [session,dispatch]);

  if (!isLoaded) return null;

  const toggleDrawer = () => {
    if (isXsOrSm) {
      setOpen(!open);
    }
  };

  const filteredNavItems = isGreaterThanMd ? navItems.slice(2) : navItems;
  
  
  console.log(isAuth,"isAuth")
  console.log(session,"session")
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#F4F6F8",
          boxShadow: "none",
          position: "fixed",
          zIndex: 1300,
        }}
      >
         <Box
    sx={{
      maxWidth: "1900px", 
      width: "100%",
      margin: "0 auto",
    }}
  >
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
           
            
          >
            <Grid item sx={{ display: { xs: "block", sm: "none", md: "block" } }}>
              <Link href="/" passHref>
                {!searchOpen && (isSmallerThanSm ) ? (
                  <Image src="/logo.svg" width={146} height={25} alt="logo" />
                ):
                 isGeaterThanSm ? <Image src="/logo.svg" width={146} height={25} alt="logo" />:""}
              </Link>
            </Grid>

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
                    <LightTooltip
                      key={item.name}
                      sx={{
                        "& .MuiTooltip-tooltip": {
                          backgroundColor: "white", 
                          color: "black", 
                        },
                      }}
                      title={
                        <TooltipContent
                          heading={item.name}
                          description={item.description}
                        />
                      }
                      placement="bottom"
                      arrow
                      disablePortal={false}
                    >
                      <ListItem
                        component={Link}
                        href={item.link}
                        onClick={toggleDrawer}
                        sx={{
                          px: 1,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          cursor: "pointer",
                        }}
                      >
                        <StyledListItemText
                          primary={item.name}
                          isFirst={filteredNavItems.indexOf(item) === 0}
                        />
                      </ListItem>
                    </LightTooltip>
                  ))}
                </List>
              </Box>
            </StyledGrid1>

            <Grid
              item
              width="300px"
              sx={{
                display: { xs: "none", sm: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <Image src="/logo.svg" width={136} height={30} alt="logo" />
            </Grid>

            <StyledGrid1 item width="22%">
             <NavbarSearch handleSearchClick={handleSearchClick} />
            </StyledGrid1>

            <StyledGrid5
              item
              sx={{
                display: (isAuth || session?.user) && !isSmallerThanMd ? "flex" : "none",
                alignItems: "center",
                
              }}
            >
             
            </StyledGrid5>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: isSmallerThanSm && searchOpen ? "100%" : "auto",
              }}
            >
              
              

              
              {(searchOpen && isSmallerThanMd) && <NavbarSearch handleSearchClick={handleSearchClick} />
               
              }

              {!isSmallerThanSm && (
                <>
                {!searchOpen && (
                <IconButton
                  onClick={handleSearchClick}
                  sx={{ display: { xs: "none", sm: "block", md: "none" } }}
                >
                  <SearchIcon />
                </IconButton>
              )}
                  <StyledButton1
                    sx={{
                      marginRight: "16px",
                      display: isAuth || session?.user ? "none" : "",
                    }}
                    variant="contained"
                    onClick={() => {
                      router.push("login");
                    }}
                  >
                    Sign Up
                  </StyledButton1>

                  <Typography
                    color={colors.navyBlue500}
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      cursor: "pointer",
                      display: isAuth || session?.user ? "none" : "",
                    }}
                    onClick={() => {
                      router.push("login");
                    }}
                    disableElevation
                  >
                    Login
                  </Typography>
                  
                  <Box
                sx={{
                  backgroundColor: "#172641",
                  borderRadius: "50%",
                  padding: "2px",
                  width: "30px",
                  height: "30px",
                  display:  isAuth || session?.user ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {user?.profile_pic === null ? (
                  <Typography color="white">
                    {user?.first_name.charAt(0)}
                  </Typography>
                ) : session?.user ? (
                  <Image
                    src={session?.user?.image}
                    width={30}
                    height={30}
                    alt="profile"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <Image
                    src="/images.jpg"
                    width={30}
                    height={30}
                    alt="profile"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
              </Box>
              <IconButton
                id="demo-customized-button"
                aria-controls={opens ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={opens ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                sx={{display:  isAuth || session?.user ? "flex" : "none",}}
              >
                <KeyboardArrowDownOutlinedIcon />
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={opens}
                onClose={handleClose}
              >
                <StyledMenuItem onClick={handleClose} disableRipple>
                  <IconButton
                    sx={{ "& svg path": { fill: "black" }, padding: 0 }}
                  >
                    <PersonOutlineIcon />
                  </IconButton>
                  My Account
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose} disableRipple>
                  <IconButton
                    sx={{ "& svg path": { fill: "black" }, padding: 0 }}
                  >
                    <ShoppingBagOutlinedIcon />
                  </IconButton>
                  My Orders
                </StyledMenuItem>
                {/* <Divider sx={{ my: 0.5 }} /> */}

                <StyledMenuItem onClick={handleClose} disableRipple>
                  <IconButton
                    sx={{ "& svg path": { fill: "black" }, padding: 0 }}
                  >
                    <AccessTimeOutlinedIcon />
                  </IconButton>
                  My Watchlist
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose} disableRipple>
                  <IconButton
                    sx={{ "& svg path": { fill: "black" }, padding: 0 }}
                  >
                    <CardGiftcardOutlinedIcon />
                  </IconButton>
                  My Watchlist
                </StyledMenuItem>

                <StyledMenuItem2
                  onClick={() => {
                    doLogout();
                    handleClose();
                    if (isAuth) {
                      dispatch(logout());
                    }
                  }}
                  disableRipple
                >
                  <IconButton
                    sx={{
                      "& svg path": { fill: colors.red400 },
                      padding: 0,
                    }}
                    type="submit"
                  >
                    <LogoutOutlinedIcon />
                  </IconButton>
                  Logout
                </StyledMenuItem2>
              </StyledMenu>
                </>
              )}
            </Grid>

            {!searchOpen && (
              <StyledGrid4 item>
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>

                <IconButton onClick={toggleDrawer}>
                  {open ? (
                    <CloseIcon sx={{ color: "black" }} />
                  ) : (
                    <MenuIcon />
                  )}
                </IconButton>
              </StyledGrid4>
            )}
          </Grid>
        </Toolbar>
        </Box>
      </AppBar>
      

      <Drawer
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            style: {
              backgroundColor: "#1C1C1C80",
            },
          },
          hideBackdrop: false,
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
            {filteredNavItems.map((item, index) => (
          <LightTooltip
          key={item.name}
          title={
            <TooltipContent
              heading={item.name}
              description={item.description}
            />
          }
          placement="bottom"
          arrow
          disablePortal={false}
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "white",
                color: "black",
                borderRadius: "4px",
                padding: "8px",
              },
            },
          }}
        >
            <ListItem
              component={Link}
              href={item.link}
              onClick={toggleDrawer}
              sx={{
                px: 1,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              <StyledListItemText
                primary={item.name}
                isFirst={index === 0}
              />
            </ListItem>
          </LightTooltip>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;