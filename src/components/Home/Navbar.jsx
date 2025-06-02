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
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import FeedIcon from "@mui/icons-material/Feed";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddchartIcon from "@mui/icons-material/Addchart";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname } from "next/navigation";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../Constants/colors";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { navItems } from "@/utils/Data";
import { useRouter } from "next/navigation";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { doLogout } from "../../app/actions/index";
import { logout } from "@/app/Redux/Slices/authSlice";
import { userDetailsApi } from "@/app/Redux/Slices/authSlice";
import NavbarSearch from "../Home/NavbarSearch";
import NavbarSearch2 from "../Home/NavbarSearch2";

const StyledListItemText = styled(ListItemText)`
  && .MuiTypography-root {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: ${(props) =>
      props.isFirst
        ? props.isXsOrSm
          ? colors.themeGreen
          : colors.black
        : colors.black};
    &:hover {
      color: ${colors.themeGreen};
    }
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
  @media (min-width: 639px) {
    display: none;
  }
`;

const StyledGrid4 = styled(Grid)`
  @media (min-width: 639px) {
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
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color:black;
`;

const StyledMenuItem2 = styled(MenuItem)`
  font-weight: 600;
  font-size: 15px;
  line-height: 17px;
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
    color: "black",
    boxShadow: "0px 2px 7px 0px #0000001F",
    fontSize: "12px",
    lineHeight: "14px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "white",
  },
}));

const TooltipContent = ({ heading, description }) => (
  <Box>
    <Typography variant="body2" fontWeight="bold">
      {heading}
    </Typography>
    <Typography color="black" variant="body2">
      {description}
    </Typography>
  </Box>
);

const Navbar = () => {
  const theme = useTheme();
  const isGreaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isGeaterThanSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { isAuth, user, userDetails } = useSelector((store) => store.auth);
  const { mentorshipInfo } = useSelector((store) => store.mentorship);
  const router = useRouter();
  const pathname = usePathname();
  const isXsOrSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
   const show_mentorship_dashboard = userDetails?.has_joined_mentor_batch; 

  const [activeTab, setActiveTab] = useState(0);

  const routeMap = {
    "/education": 0,
    "/times": 1,
    "/prime": 2,
    "/discovery": 3,
    "/ipo-zone": 4,
  };

  useEffect(() => {
    setActiveTab(routeMap[pathname] || -1);
  }, [pathname]);

  const handleNavigation = (path) => {
    router.push(path);
  };
  const handleMouseEnter = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl2(null);
  };

  const handleSearchClick = () => {
    if(isSmallerThanMd)
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

  useEffect(() => {
    setIsLoaded(true);
   
   
  }, [dispatch, isAuth, pathname]);

  useEffect(()=>{
    if(isAuth)
    {
      dispatch(userDetailsApi())
    }
   },[isAuth])
    
  if (!isLoaded) return null;

  const toggleDrawer = () => {
    if (isSmallerThanMd) {
      setOpen(!open);
    }
  };

  const filteredNavItems = isGreaterThanMd
    ? navItems.filter(
        (elem) =>
          elem.name !== "Sign Up" &&
          elem.name !== "Login" &&
          elem.name !== "Knowledge" &&
          elem.name !== "Self Help" &&
          elem.name!== "Exam" && elem.name!== "Recent Filing"
          && elem.name !== "Mentor Dashboard"
         
      )
    : (!isGreaterThanMd  && !show_mentorship_dashboard) ? navItems.filter((elem) => {
  return elem.name !== "Mentor Dashboard";
}) : navItems;

   const filteredNavItems2 = filteredNavItems.filter((elem,index)=>{
    return (
      elem.name !== "Sign Up" &&
          elem.name !== "Login"
    )
   })
    
  

   const utilitiesMenu = [
     { name: "Knowledge", link: "/knowledge" },
     { name: "Self Help", link: "/self-help" },
     { name: "Exam", link: "/exam" },
     { name: "Recent Filing", link: "/filing" },
     ...(show_mentorship_dashboard
       ? [{ name: "Mentor Dashboard", link: "/mentorship/dashboard" }]
       : [])
   ];

  return (
    <>
   
  
      <AppBar
      
        sx={{
          backgroundColor: "#F4F6F8",
          boxShadow: "none",
          position: "fixed",
          top: pathname=="/" ? "30px": "0px",
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
          <Toolbar sx={{ paddingX: 0 }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              display={{ xs: "flex", md: "flex" }}
            
            >
             
             {
              !searchOpen && 
              <Grid item width={{ xs: "100%", sm: "auto" }} >
              <Grid
                container
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Grid item sx={{display:{xs:"none",sm:"block",md:"none"}}}>
                <IconButton onClick={toggleDrawer}>
                        {open ? (
                          <CloseIcon sx={{ color: "black" }} />
                        ) : (
                          <MenuIcon />
                        )}
                      </IconButton>
                  </Grid>
               
                <Grid
                  item
                  sx={{
                    display: {
                      xs: searchOpen ? "none" :'flex',
                      sm: "none",
                      md: "flex",
                      alignItems: "center",
                      paddingBottom: "8px",
                    },
                  }}
                >
                  <Link href="/" passHref>
                    {!searchOpen && isSmallerThanSm ? (
                      <Image
                        src="/logo.svg"
                        width={146}
                        height={25}
                        alt="logo"
                      />
                    ) : isGeaterThanSm ? (
                      <Image
                        src="/logo.svg"
                        width={146}
                        height={25}
                        alt="logo"
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                </Grid>

                <StyledGrid3 item sx={{display:"flex",flexDirection:"row"}}>
                  {!searchOpen && (
                    <>
                      <IconButton onClick={handleSearchClick}>
                        <SearchIcon />
                      </IconButton>
                      <Grid container alignItems="center">
                        <Box
                          sx={{
                            borderColor: "#172641",
                            borderRadius: "50%",
                            padding: "2px",
                            width: "30px",
                            height: "30px",
                            display:
                              isAuth  ? "flex" : "none",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            flexDirection: "row",
                          }}
                        >
                          <Image
                            src={
                              userDetails?.profile_pic
                                ? userDetails?.profile_pic
                                : "/dummy_image.jpg"
                            }
                            width={25}
                            height={25}
                            alt="profile"
                            style={{
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                        <IconButton
                          id="demo-customized-button"
                          aria-controls={
                            opens ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={opens ? "true" : undefined}
                          variant="contained"
                          disableElevation
                          onClick={handleClick}
                          sx={{
                            padding:0,
                            display:
                              isAuth  ? "flex" : "none",
                          }}
                        >
                          <KeyboardArrowDownOutlinedIcon />
                        </IconButton>
                      </Grid>

                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={opens}
                        onClose={handleClose}
                        disablePortal
                        disableScrollLock={true}
                        TransitionProps={{
                          timeout: 200,
                        }}
                        PaperProps={{
                          sx: {
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            minWidth: "200px",
                            backgroundColor: "none",
                          },
                        }}
                      >
                        <Link
                          href="/profile"
                          style={{ textDecoration: "none" }}
                        >
                          <StyledMenuItem onClick={handleClose} disableRipple>
                            <IconButton
                              sx={{
                                "& svg path": {
                                  fill: colors.navyBlue900,
                                  stroke: colors.navyBlue900,
                                  strokeWidth: 0.7,
                                },
                                padding: 0,
                              }}
                            >
                              <PersonOutlineIcon />
                            </IconButton>
                            My Account
                          </StyledMenuItem>
                        </Link>

                        <Link
                          href="/watchlist"
                          style={{ textDecoration: "none" }}
                        >
                          <StyledMenuItem onClick={handleClose} disableRipple>
                            <IconButton
                              sx={{
                                "& svg path": {
                                  fill: colors.navyBlue900,
                                  stroke: colors.navyBlue900,
                                  strokeWidth: 0.7,
                                },

                                padding: 0,
                              }}
                            >
                              <AccessTimeOutlinedIcon />
                            </IconButton>
                            My Watchlist
                          </StyledMenuItem>
                        </Link>

                        <StyledMenuItem2
                          onClick={() => {
                            handleClose();
                            if (isAuth) {
                              dispatch(logout());
                              dispatch({ type: "auth/logout" });
                            }
                          }}
                          disableRipple
                        >
                          <IconButton
                            sx={{
                              "& svg path": {
                                fill: colors.red400,
                                stroke: colors.red400,
                                strokeWidth: 0.7,
                              },
                              padding: 0,
                            }}
                            type="submit"
                          >
                            <LogoutOutlinedIcon />
                          </IconButton>
                          Logout
                        </StyledMenuItem2>
                      </StyledMenu>

                      <IconButton onClick={toggleDrawer}>
                        {open ? (
                          <CloseIcon sx={{ color: "black" }} />
                        ) : (
                          <MenuIcon />
                        )}
                      </IconButton>
                    </>
                  )}
                </StyledGrid3>

                <StyledGrid1 item>
                  <Box>
                    <List
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 0,
                        alignItem: "flex-end",
                      }}
                    >
                      {filteredNavItems.map((item) => (
                        // <LightTooltip
                        //   key={item.name}
                        //   sx={{
                        //     "& .MuiTooltip-tooltip": {
                        //       backgroundColor: "white",
                        //       color: "black",
                        //     },
                        //   }}
                        //   title={
                        //     <TooltipContent
                        //       heading={item.name}
                        //       description={item.description}
                        //     />
                        //   }
                        //   placement="bottom"
                        //   arrow
                        //   disablePortal={false}
                        // >
                          <ListItem
                          key={item.name}
                            component={Link}
                            href={item.link}
                            onClick={toggleDrawer}
                            sx={{
                              px: 1,
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              cursor: "pointer",

                              "&:hover .list-item-text": {
                                color: `${colors.themeGreen} !important`,
                              },
                            }}
                          >
                            <div className="list-item-text-wrapper">
                              <StyledListItemText
                                primary={item.name}
                                className="list-item-text"
                                isFirst={filteredNavItems.indexOf(item) === 0}
                              />
                            </div>
                          </ListItem>
                        // </LightTooltip>
                      ))}
                      <ListItem
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        sx={{
                          px: 0,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          cursor: "pointer",
                        }}
                      >
                        <Button
                          aria-controls={
                            anchorEl2 ? "utilities-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={anchorEl2 ? "true" : undefined}
                          onMouseEnter={handleMouseEnter}
                          onClick={(e) => setAnchorEl2(e.currentTarget)}
                          sx={{
                            color: anchorEl2
                              ? colors.themeGreen
                              : colors.navyBlue900,
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "17px",
                            textTransform: "none",
                            "&:hover": {
                              color: colors.themeGreen,
                              "& .MuiSvgIcon-root": {
                                color: colors.themeGreen,
                              },
                            },
                          }}
                          endIcon={
                            <KeyboardArrowDownOutlinedIcon
                              sx={{
                                color: anchorEl2
                                  ? colors.themeGreen
                                  : colors.navyBlue900,
                                transition: "color 0.2s ease",
                              }}
                            />
                          }
                        >
                          Utilities
                        </Button>

                        <Menu
                          id="utilities-menu"
                          anchorEl={anchorEl2}
                          open={Boolean(anchorEl2)}
                          onClose={() => setAnchorEl2(null)}
                          disablePortal
                          disableScrollLock={true}
                          TransitionProps={{
                            timeout: 200,
                          }}
                          MenuListProps={{
                            onMouseLeave: handleMouseLeave,
                            "aria-labelledby": "utilities-button",
                          }}
                          PaperProps={{
                            sx: {
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              minWidth: "200px",
                              backgroundColor: "none",
                            },
                          }}
                        >
                          {
                            utilitiesMenu?.map((item,index)=>{
                              return(
                                <Link
                                href={item?.link}
                                style={{ textDecoration: "none" }}
                                key={index}
                              >
                                <MenuItem
                                  disableRipple
                                  sx={{
                                    padding: "12px 16px",
                                    "&:hover .menu-text": {
                                      color: colors.themeGreen,
                                    },
                                    backgroundColor: "transparent !important",
                                    "&:hover": {
                                      backgroundColor: "transparent !important",
                                    },
                                    "&.Mui-focusVisible": {
                                      backgroundColor: "transparent",
                                    },
                                    "&.Mui-selected": {
                                      backgroundColor: "transparent",
                                    },
                                  }}
                                >
                                  <Typography
                                    className="menu-text"
                                    color={colors.navyBlue900}
                                    sx={{
                                      fontWeight: "600",
                                      fontSize: "14px",
                                      lineHeight: "17px",
                                    }}
                                  >
                                   {item?.name}
                                  </Typography>
                                </MenuItem>
                              </Link>
                              )
                            })
                          }
                          
                        
                        </Menu>
                      </ListItem>
                    </List>
                  </Box>
                </StyledGrid1>
              </Grid>
            </Grid>
             }
             
              {
                !searchOpen && <Grid item display={{xs:"none",sm:"block",md:"none"}}>
                <Image
                            src="/logo.svg"
                            width={146}
                            height={25}
                            alt="logo"
                          />
                </Grid>
  
              }
              
              <Grid item >
                <Grid container alignItems="center" spacing={3} justifyContent="center">
                 
                  <StyledGrid1>
                    <Grid item width="100%">
                      {/* <NavbarSearch handleSearchClick={handleSearchClick} /> */}
                      <NavbarSearch2 handleSearchClick={handleSearchClick} />
                    </Grid>

                    {!searchOpen && (
                      <StyledGrid4 item>
                        {/* <IconButton onClick={handleSearchClick}>
                          <SearchIcon />
                        </IconButton> */}

                        <IconButton onClick={toggleDrawer}>
                          {open ? (
                            <CloseIcon sx={{ color: "black" }} />
                          ) : (
                            <MenuIcon />
                          )}
                        </IconButton>
                      </StyledGrid4>
                    )}
                  </StyledGrid1>

                  <Grid item sx={{padding:0}}>
                    {searchOpen && isSmallerThanMd && (
                      // <NavbarSearch handleSearchClick={handleSearchClick} />
                      <NavbarSearch2 handleSearchClick={handleSearchClick} />
                    )}

                    {!isSmallerThanSm && (
                      <>
                       
                       

                        <Grid container alignItems="center">
                          {
                            !searchOpen &&  <IconButton
                            onClick={handleSearchClick}
                            sx={{
                              display: { xs: "none", sm: "block", md: "none" },
                            }}
                          >
                            <SearchIcon />
                          </IconButton>
                          }
                          {
                            !searchOpen && 
                             <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StyledButton1
                            sx={{
                              marginRight: "16px",
                              display: isAuth  ? "none" : "",
                            }}
                            variant="contained"
                            onClick={() => {
                              router.push("/signup");
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
                              display: isAuth  ? "none" : "",
                            }}
                            onClick={() => {
                              const currentPath =
                                window.location.pathname +
                                window.location.search;
                              localStorage.setItem("redirectUrl", currentPath);
                              router.push("/login");
                            }}
                            disableElevation
                          >
                            Login
                          </Typography>
                        </Box>
                          }
                       
                       {
                        !searchOpen && <>
                         <Box
                            sx={{
                              borderColor: "#172641",
                              borderRadius: "50%",
                              padding: "2px",
                              width: "30px",
                              height: "30px",
                              display:
                                isAuth ? "flex" : "none",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                              flexDirection: "row",
                            }}
                          >
                            <Image
                              src={
                                userDetails?.profile_pic
                                  ? userDetails?.profile_pic
                                  : "/dummy_image.jpg"
                              }
                              width={30}
                              height={30}
                              alt="profile"
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </Box>
                          <IconButton
                            id="demo-customized-button"
                            aria-controls={
                              opens ? "demo-customized-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={opens ? "true" : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            sx={{
                              padding:0,
                              display:
                                isAuth  ? "flex" : "none",
                            }}
                          >
                            <KeyboardArrowDownOutlinedIcon />
                          </IconButton>
                        </>
                       }
                         
                        </Grid>

                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl}
                          open={opens}
                          onClose={handleClose}
                          disablePortal
                          disableScrollLock={true}
                          TransitionProps={{
                            timeout: 200,
                          }}
                          PaperProps={{
                            sx: {
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              minWidth: "200px",
                              backgroundColor: "none",
                            },
                          }}
                        >
                          <Link
                            href="/profile"
                            style={{ textDecoration: "none" }}
                          >
                            <StyledMenuItem onClick={handleClose} disableRipple>
                              <IconButton
                                sx={{
                                  "& svg path": {
                                    fill: colors.navyBlue900,
                                    stroke: colors.navyBlue900,
                                    strokeWidth: 0.7,
                                  },
                                  padding: 0,
                                }}
                              >
                                <PersonOutlineIcon />
                              </IconButton>
                              My Account
                            </StyledMenuItem>
                          </Link>

                          <Link
                            href="/watchlist"
                            style={{ textDecoration: "none" }}
                          >
                            <StyledMenuItem onClick={handleClose} disableRipple>
                              <IconButton
                                sx={{
                                  "& svg path": {
                                    fill: colors.navyBlue900,
                                    stroke: colors.navyBlue900,
                                    strokeWidth: 0.7,
                                  },

                                  padding: 0,
                                }}
                              >
                                <AccessTimeOutlinedIcon />
                              </IconButton>
                              My Watchlist
                            </StyledMenuItem>
                          </Link>

                          <StyledMenuItem2
                            onClick={() => {
                              handleClose();
                              if (isAuth) {
                                dispatch(logout());
                                dispatch({ type: "auth/logout" });
                              }
                            }}
                            disableRipple
                          >
                            <IconButton
                              sx={{
                                "& svg path": {
                                  fill: colors.red400,
                                  stroke: colors.red400,
                                  strokeWidth: 0.7,
                                },
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
                </Grid>
              </Grid>
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
            top:pathname=="/" ? "85px": "55px",
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
            {(isAuth && isSmallerThanMd ? filteredNavItems2 : filteredNavItems).map((item, index) => (
              // <LightTooltip
              //   key={item.name}
              //   title={
              //     <TooltipContent
              //       heading={item.name}
              //       description={item.description}
              //     />
              //   }
              //   placement="bottom"
              //   arrow
              //   disablePortal={false}
              //   componentsProps={{
              //     tooltip: {
              //       sx: {
              //         backgroundColor: "white",
              //         color: "black",
              //         borderRadius: "4px",
              //         padding: "8px",
              //       },
              //     },
              //   }}
              // >
                <ListItem
                key={item.name}
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
              // </LightTooltip>
            ))}
          </List>
        </Box>
      </Drawer>
      {isSmallerThanSm ? (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1400 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={activeTab}
            onChange={(event, newValue) => {
              setActiveTab(newValue);
              const path = Object.keys(routeMap).find(
                (key) => routeMap[key] === newValue
              );
              if (path) handleNavigation(path);
            }}
          >
            <BottomNavigationAction
              label="Learn"
              icon={<MenuBookIcon />}
              
              sx={{ minWidth: "0px" }}
            />
            <BottomNavigationAction
              sx={{ minWidth: "0px" }}
              label="Times"
              icon={<FeedIcon />}
             
            />
            <BottomNavigationAction
              sx={{ minWidth: "0px" }}
              label="Prime"
              icon={<WebStoriesIcon />}
            />
            <BottomNavigationAction
              sx={{ minWidth: "0px" }}
              label="Discovery"
              icon={<QueryStatsIcon />}
            />
            <BottomNavigationAction
              sx={{ minWidth: "0px" }}
              label="Ipo"
              icon={<AddchartIcon />}
            />
          </BottomNavigation>
        </Paper>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
