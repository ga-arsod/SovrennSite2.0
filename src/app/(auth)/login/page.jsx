"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  InputLabel,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,Select,MenuItem,Stack
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';


const infoObj = {
  h1: "Start your investing journey.",
  h2: "Create a free account and get access to all free features of Sovrenn to equip yourself with financial Knowledge.",
  h3: "Get started in 2 minutes.",
  users: "20,000+",
};
const StyledInputLabel = styled(InputLabel)`
font-weight:400;
font-size:17px;
line-height:21px;
color:#121E32;

`;
const StyledButton1 = styled(Button)`
  border-color: #1da098;
  color: white;
  font-weight: 600;
  font-size: 17px;
  line-height: 30px;
  text-transform: none;
  width: 100%;
  background-color: #1da098;
  :hover {
    background-color: #1da098;
  }
`;

const StyledButton2 = styled(Button)`
  color: #20365b;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-transform: none;
  width: 100%;

  border: 1px solid #20365b;
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
const inputsFieldsArray = [
  {
    inputLabel: "Name",
    placeholder: "Enter your full name",
    type: "text",
    id: "name",
    htmlFor: "name",
    signIn: false,
    signUp:true,
  },
  {
    inputLabel: "Enter Email or Phone no.",
    placeholder: "Enter your email or Phone no.",
    type: "email",
    id: "email",
    htmlFor: "email",
    signIn: true,
    signUp:true,
  },
  {
    inputLabel: "Enter Password",
    placeholder: "Enter your password",
    type: "password",
    id: "password",
    htmlFor: "password",
    signIn: true,
    signUp:false,
  },
  {
    inputLabel: "Create Password",
    placeholder: "Enter at least 6 characters",
    type: "password",
    id: "createPassword",
    htmlFor: "createPassword",
    signIn: false,
    signUp:true,
  },
  {
    inputLabel: "Confirm Password",
    placeholder: "Re-enter your password",
    type: "password",
    id: "confirmPassword",
    htmlFor: "confirmPassword",
    signIn: false,
    signUp:true,
  },
];
const inputsFieldsArray2 = {
 name: {
    inputLabel: "Your Phone No.",
    placeholder: "Enter your Phone no.",
    type: "tel",
    id: "phone",
    htmlFor: "phone",
    
  },
 state: {
    inputLabel: "Select Your State",
    placeholder: "Select Your State",
    type: "email",
    id: "state",
    htmlFor: "state",
   
  },
  
 
};

const StyledGrid=styled(Grid)`
@media (max-width: 700px) {
display:none;
}

`;
const login = () => {
  const [showPassword, setShowPassword] = useState({
    password:false,
    createPassword:false,
    confirmPassword:false,

  });
  const [isSignIn, setIsSignIn] = useState(true);
  const handleClickShowPassword = (id) => {
    console.log(id,"id")
    setShowPassword({...showPassword,[id]:!showPassword[id]});
  };
  
  const [selectedValue, setSelectedValue] = useState("hello");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const theme=useTheme()
  return (
    <Box>
      <Grid container height={{lg:"100vh"}} direction={{xs:"column",lg:"row"}} >
        <StyledGrid item xs={12} lg={6} order={{xs:2,lg:1}} >
          <Grid
            container
            height="100%"
            sx={{
              background: "linear-gradient(to right, #0C4340, #4AB3AD)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              item
              paddingX={7}
              paddingY="3rem"
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Box display="flex" justifyContent={{xs:"center",lg:"flex-start"}}>
              <Avatar alt="star" src="/stars.svg" />
              </Box>
             
             

            
             

              <Typography
                color="#E4E7EC"
                textAlign={{xs:"center",lg:"start"}}
                sx={{ fontWeight: "600", fontSize: "50px", lineHeight: "52px" }}
              >
                {infoObj.h1}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                textAlign={{xs:"center",lg:"start"}}
                color="#E4E7EC"
                sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px" }}
              >
                {infoObj.h2}
              </Typography>
              <Typography
                variant="body1"
                color="#E4E7EC"
                textAlign={{xs:"center",lg:"start"}}
                sx={{ fontWeight: "600", fontSize: "19px", lineHeight: "23px" }}
              >
                {infoObj.h3}
              </Typography>
              {/* <Grid container sx={{ position: "relative" }}  >
                <Grid item >
                  <Box>
                    <Avatar
                      alt="Avatar 1"
                      src="/aditya.png"
                      sx={{
                        width: 40,
                        height: 40,
                        position: "absolute",
                        zIndex: 1,
                      }}
                    />
                    <Avatar
                      alt="Avatar 2"
                      src="/akriti.png"
                      sx={{
                        width: 40,
                        height: 40,
                        position: "absolute",
                        left: 30,
                        zIndex: 2,
                      }}
                    />
                    <Avatar
                      alt="Avatar 2"
                      src="/akriti.png"
                      sx={{
                        width: 40,
                        height: 40,
                        position: "absolute",
                        left: 60,
                        zIndex: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    color="#E4E7EC"
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "17px",
                      position: "absolute",
                      left:120,
                      top: 12,
                    }}
                  >{`Join ${infoObj.users} users`}</Typography>
                </Grid>
              </Grid> */}
              <Grid container sx={{ position: 'relative',display:"flex",justifyContent:{xs:"center",lg:"flex-start"}, alignItems: 'center', height: '56px' }}>
      <Grid item  >
        <Stack direction="row" sx={{ position: 'relative' }}>
          <Avatar
            alt="Avatar 1"
            src="/aditya.png"
            sx={{ width: 40, height: 40, zIndex: 1 }}
          />
          <Avatar
            alt="Avatar 2"
            src="/akriti.png"
            sx={{ width: 40, height: 40, position: 'absolute', left: 20, zIndex: 2 }}
          />
          <Avatar
            alt="Avatar 3"
            src="/akriti.png"
            sx={{ width: 40, height: 40, position: 'absolute', left: 40, zIndex: 2 }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ pl: 6.5 }}> {/* pl (padding-left) is roughly equivalent to adjusting for 3 avatars */}
        <Typography
          color="#E4E7EC"
          sx={{
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '17px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
              lineHeight: '15px',
            },
          }}
        >
          {`Join ${infoObj.users} users`}
        </Typography>
      </Grid>
    </Grid>
            </Grid>
          </Grid>
        </StyledGrid>
        <Grid
          item
         xs={12}
         lg={6}
         order={{xs:1,lg:2}}
         
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:"100%",
            paddingY:"4rem"
          
          }}
        >
          {/* <Grid
            container
            display="flex"
            width={{xs:"90%",sm:"50%",lg:"70%"}}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              width="100%"
              sx={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <Typography
                textAlign="center"
                color="#1DA098"
                sx={{ fontWeight: "600", fontSize: "33px", lineHeight: "40px" }}
              >
               {isSignIn ? "Sign In" : "Sign Up"}
              </Typography>
              <form>
                <Grid container direction="column">
                  {isSignIn ? inputsFieldsArray.map((element, index) => {
                    return (
                       
                  element.signIn &&     <Grid item marginBottom={2} key={index}>
                        <StyledInputLabel htmlFor={element.htmlFor}>
                         {element.inputLabel}
                        </StyledInputLabel>
                        <TextField
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '12px 8px', 
                          },
                          '& .MuiInputLabel-root': {
                            fontSize: '0.60rem', 
                          },
                        }}
                          id={element.id}
                          type={element.type}
                          placeholder={element.placeholder}
                          fullWidth
                          InputProps={{
                            sx: { fontSize: '0.90rem' }, // Adjust font size to decrease 
                          endAdornment: (
                              <InputAdornment position="end">
                                {
                                  element.type=="password" && <IconButton
                                  aria-label="toggle password visibility"
                                  id={element.id}
                                  onClick={(e)=>{handleClickShowPassword(e.target.id)}}
                                  edge="end"
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                }
                              </InputAdornment>
                            ),
                          }}
                        />
                         {

element.id=="password" && <Typography textAlign="right">
                        <Button
                          disableElevation
                          sx={{
                            color: "#1DA098",
                            fontWeight: "400",
                            fontSize: "13px",
                            lineHeight: "17px",
                            textTransform: "none",
                          }}
                        >
                          Forgot Password
                        </Button>
                      </Typography>
                     } 
                      </Grid>
                    );
                  })
                :
                inputsFieldsArray.map((element, index) => {
                  return (
                     
                element.signUp &&     <Grid item marginBottom={2} key={index}>
                      <StyledInputLabel htmlFor={element.htmlFor}>
                       {element.inputLabel}
                      </StyledInputLabel>
                      <TextField
                       sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '12px 8px', // Adjust padding to decrease height
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '0.60rem', // Optionally adjust label font size
                        },
                      }}
                        id={element.id}
                        type={element.type}
                        placeholder={element.placeholder}
                        fullWidth
                        InputProps={{
                          sx: { fontSize: '0.90rem' }, // Adjust font size to decrease 
                        endAdornment: (
                            <InputAdornment position="end">
                              {
                                element.type=="password" && <IconButton
                                aria-label="toggle password visibility"
                                id={element.id}
                                onClick={(e)=>{handleClickShowPassword(e.target.id)}}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                              }
                            </InputAdornment>
                          ),
                        }}
                       
                      />
                     {

element.id==="password" && <Typography textAlign="right">
                        <Button
                          disableElevation
                          sx={{
                            color: "#1DA098",
                            fontWeight: "400",
                            fontSize: "13px",
                            lineHeight: "17px",
                            textTransform: "none",
                          }}
                        >
                          Forgot Password
                        </Button>
                      </Typography>
                     } 
                    </Grid>
                  );
                })
                }
                </Grid>

               
               
              </form>
            </Grid>
            <Grid item width="100%">
              <Grid container width="100%" rowSpacing={2}>
                <Grid item width="100%">
                  <StyledButton1 variant="contained">  {isSignIn ? "Sign In" : "Sign Up"}</StyledButton1>
                </Grid>
                <Grid item width="100%">
                  <Typography
                    color="#98A3B4"
                    textAlign="center"
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "17px",
                    }}
                  >
                    Or
                  </Typography>
                </Grid>
                <Grid item width="100%">
                  <StyledButton2
                    variant="outlined"
                    startIcon={
                      <img
                        src="/google.svg"
                        alt="My Image"
                        style={{ width: 20, height: 20 }}
                      />
                    }
                  >
                    Continue with Google
                  </StyledButton2>
                </Grid>
                <Grid item width="100%">
                  <Typography textAlign="center" sx={{cursor:"pointer"}}>
                    <StyledTypography component="span" color="#121E32">
                      Don’t have an account?
                    </StyledTypography>
                    <StyledTypography
                      component="span"
                      color="#1DA098"
                      onClick={() => {
                        setIsSignIn(!isSignIn);
                      }}
                    >
                      {isSignIn ? "Sign Up" : "Sign In"}
                    </StyledTypography>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid
            container
            display="flex"
            width={{xs:"90%",sm:"50%",lg:"70%"}}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              width="100%"
              sx={{ display: "flex", flexDirection: "column", gap: "25px" }}
            >
              <Typography
                textAlign="center"
                color="#1DA098"
                sx={{ fontWeight: "600", fontSize: "33px", lineHeight: "40px" }}
              >
              Basic Info
              </Typography>
              <form>
                <Grid container direction="column">
                  
                       
                    <Grid item marginBottom={2} >
                   
                        <StyledInputLabel htmlFor={inputsFieldsArray2.name.htmlFor}>
                         {inputsFieldsArray2.name.inputLabel}
                        </StyledInputLabel>
                        <TextField
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '12px 8px', 
                          },
                          '& .MuiInputLabel-root': {
                            fontSize: '0.60rem', 
                          },
                        }}
                          id={inputsFieldsArray2.name.id}
                          type={inputsFieldsArray2.name.type}
                          placeholder={inputsFieldsArray2.name.placeholder}
                          fullWidth
                          InputProps={{
                            sx: { fontSize: '0.90rem' }
                         
                          }}
                        />
                       
                       
  

                      </Grid>
                      <Grid item width="100%" marginBottom={2}>
                      
                      <StyledInputLabel id={inputsFieldsArray2.state.id}>{inputsFieldsArray2.state.inputLabel}</StyledInputLabel>
  <Select
    labelId={inputsFieldsArray2.state.id}
    id={inputsFieldsArray2.state.id}
    // value={age}
   
    sx={{
      '& .MuiOutlinedInput-input': {
        padding: '10px 8px', 
      },
      '& .MuiInputLabel-root': {
        fontSize: '0.60rem', 
      },
    }}
    value={selectedValue}
    onChange={handleChange}
    variant="outlined"
    
    displayEmpty
   fullWidth
  >
    <MenuItem value="Select an option"  defaultValue={true}>
          Select an option
        </MenuItem>
    
    <MenuItem value={"Haryana"}>Haryana</MenuItem>
    <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
    <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
  </Select>
  
                      </Grid>
                   
                </Grid>

               
               
              </form>
            </Grid>
            <Grid item width="100%">
              <Grid container width="100%" rowSpacing={2}>
                <Grid item width="100%">
                  <StyledButton1 variant="contained">Create Profile</StyledButton1>
                </Grid>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default login;
