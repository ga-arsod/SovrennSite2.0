import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Avatar, Typography, IconButton, InputAdornment,Divider } from '@mui/material';
import { styled } from '@mui/system';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { colors } from '../Constants/colors';


const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center; 
  padding: 12px;
  padding-top: 90px;
 @media (max-width: 639px) {
    padding-top: 20px;
   
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
 
`;
 const StyledGrid=styled(Grid)`
  box-shadow: 0px 1px 2px 0px #1018280F;
  border-radius:8px;
box-shadow: 0px 1px 3px 0px #1018281A;

 `

const ProfileContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  margin-right: 60px;
`;

const AvatarWrapper = styled(Box)`
  position: relative;
  width: 120px;
  height: 120px;
  border: 4px solid white;
  box-shadow: 0px 4px 6px -2px #1018280D;
  box-shadow: 0px 12px 16px -4px #1018281A;
  border-radius: 50%;
`;

const AvatarStyled = styled(Avatar)`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 50%; 
`;

const EditIconButton = styled(IconButton)`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: ${colors.themeGreen};
  padding: 4px;
  &:hover {
    background-color: ${colors.themeGreen};
  }
`;

const EditedBorderColorOutlinedIcon = styled(BorderColorOutlinedIcon)`
  color: white;
`;

const GreenBorderColorOutlinedIcon = styled(BorderColorOutlinedIcon)`
  color: ${colors.themeGreen}; 
  cursor: pointer;
  font-size: 15px; 
`;

const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  padding:0px 24px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
 padding:0px 24px;
  & .MuiInputBase-root {
    font-size: 16px;
    line-height:21px;
    color: #010C15;
    font-weight:400;
    border-radius: 8px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #d0d5dd;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid #d0d5dd;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #d0d5dd;
  }

  & .MuiInputBase-input {
    padding: 10px 12px; /* Adjust padding here: 8px for vertical and 12px for horizontal */
  }

  /* Styling the placeholder */
  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color:#96A7B4; /* Change this to your desired placeholder color */
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  background-color: ${colors.greyBlue100};
  color: ${colors.greyBlue600};
  text-transform:none;
  padding:12px 18px;
  &:hover {
    background-color: #556677;
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  color:#101828;
  white-space:nowrap;
  @media (max-width: 639px) {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
   
  }
`;

const Details = () => {
  const [avatar, setAvatar] = useState('https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container sx={{ width: { xs: '100%', md: '1000px' }, justifyContent: 'center' }} marginTop={1}>
      <ProfileContainer item xs={3}>
        <AvatarWrapper>
          <AvatarStyled alt="User Avatar" src={avatar} />
          <EditIconButton component="label">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <EditedBorderColorOutlinedIcon fontSize="small" />
          </EditIconButton>
        </AvatarWrapper>
        <StyledTypography sx={{ marginTop: 1 }}>
          Ritik Sahu
        </StyledTypography>
      </ProfileContainer>
      <StyledGrid item width="100%">
        <Box component="form" noValidate autoComplete="off" paddingY="16px">
          <StyledInputLabel htmlFor="full_name">Full Name</StyledInputLabel>
          <StyledTextField
            placeholder="Ritik Sahu"
            id="full_name"
            name="full_name"
            sx={{ marginBottom: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GreenBorderColorOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <StyledInputLabel htmlFor="phone_number">Phone No.</StyledInputLabel>
          <StyledTextField
            placeholder="99393493493"
            id="phone_number"
            name="phone_number"
            sx={{ marginBottom: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GreenBorderColorOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <StyledInputLabel htmlFor="email">Email</StyledInputLabel>
          <StyledTextField
            placeholder="Ritiksahu@gmail.com"
            id="email"
            name="email"
            sx={{ marginBottom: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GreenBorderColorOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <StyledInputLabel htmlFor="state">State</StyledInputLabel>
          <StyledTextField
            placeholder="Uttar Pradesh"
            id="state"
            name="state"
            sx={{ marginBottom: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GreenBorderColorOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <Divider sx={{marginBottom:"16px"}} />
          <Box paddingX="24px" sx={{display:'flex',justifyContent:"flex-end"}}>
          <StyledButton  variant="contained">Save Changes</StyledButton>
          </Box>
         
         
         
        </Box>
       
      </StyledGrid>
    </Container>
  );
};

export default Details;