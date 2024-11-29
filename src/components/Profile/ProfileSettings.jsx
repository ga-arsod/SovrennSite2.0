"use client"
import React ,{useState} from 'react';
import { TextField, Box, Typography, Button, InputAdornment } from '@mui/material';
import { colors } from '../Constants/colors';
import { styled } from '@mui/system';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ProfileModal from "../../components/Modal/ProfileModal"
import { resetPasswordApi } from '@/app/Redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
 
`;

const StyledTextField = styled(TextField)`
  width: 100%;
 

  & .MuiInputBase-root {
    font-size: 16px;
    line-height: 21px;
    color: #010C15;
    font-weight: 400;
    border-radius: 8px;
    background-color: transparent !important; 
  }

 
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: #010C15 !important;
    background-clip: text !important;
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
    padding: 10px 12px;
  }

  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #96A7B4; 
    opacity: 1;
  }
`;

const GreenBorderColorOutlinedIcon = styled(BorderColorOutlinedIcon)`
  color: ${colors.themeGreen};
  cursor: pointer; 
  font-size: 17px; 
`;

const StyledTypography = styled(Typography)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`;

const StyledBox = styled(Box)`
  box-shadow: 0px 1px 2px 0px #1018280f;
  box-shadow: 0px 1px 3px 0px #1018281a;
  border-radius: 8px;
`;



const ProfileSettings=()=> {
  const dispatch=useDispatch()
 const [isOpen,setIsOpen]=useState(true);
 const { isPasswordModalOpen,message} = useSelector((store) => store.auth);
  return (
    <>
    
       <ProfileModal isOpen={isPasswordModalOpen} />
    
    <StyledBox
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '822px' },
        margin: 'auto',
        marginTop: {xs:"24px",sm:"90px"},
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: '#fff',
      }}
    >
      {/* Password Section */}
      <Box sx={{ marginBottom: {xs:"12px",sm:"24px"} }}>
        <StyledInputLabel htmlFor="password">Password</StyledInputLabel>
        <StyledTextField
      onClick={()=>{setIsOpen(true)}}
          type="password"
          id="password"
          name="password"
          value="***********"
          sx={{ marginBottom: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <GreenBorderColorOutlinedIcon   />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '24px',
          display: 'flex',
          flexDirection:{xs:"column",sm:"row"},
          gap:4,
          justifyContent: 'space-between',
        }}
      >
        {/* Access Section */}
        <Box>
          <StyledTypography sx={{ marginBottom: '8px' }}>Access</StyledTypography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.navyBlue500,
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '19px',
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#001825',
              },
            }}
          >
            Sovrenn Full Access
          </Button>
        </Box>

       
        <Box>
          <StyledTypography sx={{ marginBottom: '8px' }}>Ends On</StyledTypography>
          <StyledTypography color={colors.navyBlue300}>17th Jan 2024</StyledTypography>
        </Box>
      </Box>
    </StyledBox>
    </>
  );
}
export default ProfileSettings;