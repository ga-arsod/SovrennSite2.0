import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { colors } from "../Constants/colors";
import { useSelector } from "react-redux";
import { editUserDetailsApi } from "@/app/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { states } from "@/utils/States";
import DeleteAccountModal from "../Modal/DeleteAccountModal";

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
const StyledGrid = styled(Grid)`
  box-shadow: 0px 1px 2px 0px #1018280f;
  border-radius: 8px;
  box-shadow: 0px 1px 3px 0px #1018281a;
`;

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
  box-shadow: 0px 4px 6px -2px #1018280d;
  box-shadow: 0px 12px 16px -4px #1018281a;
  border-radius: 50%;
  flex-shrink: 0;
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
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  padding: 0px 24px;
  & .MuiInputBase-root {
    font-size: 16px;
    line-height: 21px;
    color: #010c15;
    font-weight: 400;
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
    padding: 10px 12px;
  }

  & .MuiOutlinedInput-input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #96a7b4;
    opacity: 1;
  }
`;

const StyledSelect = styled(Select)`
  & .MuiInputBase-root {
    padding: 10px 12px;
    font-size: 18px;
    color: ${colors.navyBlue800};
    border-radius: 8px;
  }

  & .MuiSelect-select {
    padding: 10px 12px;
    display: flex;
    align-items: center;
  }
`;
const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  background-color: ${colors.themeGreen};
  color: white;
  text-transform: none;
  padding: 12px 18px;
  &:hover {
    background-color: ${colors.themeButtonHover};
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  color: #101828;
  white-space: nowrap;
  @media (max-width: 639px) {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
  }
`;
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color:#F95A5A;
  text-decoration:underline;
  cursor:pointer;
`;

const Details = () => {
  const { userDetails } = useSelector((store) => store.auth);
   const [open,setOpen]=useState(false)
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(
    userDetails?.profile_pic ? userDetails?.profile_pic : "/dummy_image.jpg"
  );
  const [editableFields, setEditableFields] = useState({
    fullName: false,
    state: false,
  });
 

  
  const [displayName, setDisplayName] = useState(
    userDetails
      ? `${userDetails?.first_name} ${userDetails?.last_name}`
      : ""
  );
  const [formData, setFormData] = useState({
    fullName: displayName,
    state: userDetails?.state || "",
    profile_pic: userDetails?.profile_pic,
  });
  const [isEdited, setIsEdited] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_pic: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditable = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(editUserDetailsApi({ formData }));
    setDisplayName(formData.fullName); 
    setIsEdited(false);
    setEditableFields({ fullName: false, state: false });
  };
  useEffect(() => {
    const initialFullName = `${userDetails?.first_name} ${userDetails?.last_name}`;
    const initialState = userDetails?.state || "";
    const initialAvatar = userDetails?.profile_pic || "/dummy_image.jpg";
  
    setIsEdited(
      formData.fullName !== initialFullName ||
      formData.state !== initialState ||
      formData.profile_pic !== initialAvatar
    );
  }, [formData, userDetails]);
  return (
    <>
    <DeleteAccountModal open={open} setOpen={setOpen}/>
    <Container
      sx={{ width: { xs: "100%", md: "1000px" }, justifyContent: "center" }}
    >
      <ProfileContainer item xs={3}>
        <AvatarWrapper>
          <AvatarStyled
            alt="User Avatar"
            src={avatar}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/dummy_image.jpeg";
            }}
          />
          <EditIconButton component="label">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <EditedBorderColorOutlinedIcon fontSize="small" />
          </EditIconButton>
        </AvatarWrapper>
        <StyledTypography sx={{ marginTop: 1 }}>
        {displayName}
        </StyledTypography>
      </ProfileContainer>
      <StyledGrid item width="100%">
        <Box component="form" noValidate autoComplete="off" paddingY="16px">
          <StyledInputLabel htmlFor="full_name" sx={{ paddingX: "24px" }}>
            Full Name
          </StyledInputLabel>
          <StyledTextField
            placeholder={formData.fullName}
            id="full_name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!editableFields.fullName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GreenBorderColorOutlinedIcon
                    onClick={() => toggleEditable("fullName")}
                  />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 3 }}
          />

          <StyledInputLabel htmlFor="phone_number" sx={{ paddingX: "24px" }}>
            Phone No.
          </StyledInputLabel>
          <StyledTextField
            placeholder={userDetails ? userDetails?.phone_number : ""}
            id="phone_number"
            name="phone_number"
            sx={{ marginBottom: 3 }}
          />

          <StyledInputLabel htmlFor="email" sx={{ paddingX: "24px" }}>
            Email
          </StyledInputLabel>
          <StyledTextField
            placeholder={userDetails ? userDetails?.email : ""}
            id="email"
            name="email"
            sx={{ marginBottom: 3 }}
          />

         
          <FormControl
            fullWidth
            sx={{
              padding: "0px 24px",
              marginBottom: 3,
            }}
          >
            <StyledInputLabel htmlFor="state">Select State</StyledInputLabel>
            <StyledSelect
              labelId="state"
              id="state"
              name="state"
              defaultValue="Select State"
              fullWidth
              onChange={handleInputChange}
              value={formData.state}
              displayEmpty
             
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    zIndex: 1400,
                  },
                },
                disableScrollLock: true,
              }}
            >
              {states.map((ele, index) => {
                return (
                  <MenuItem value={ele} key={index}>
                    {ele}
                  </MenuItem>
                );
              })}
            </StyledSelect>
          </FormControl>
          <Divider sx={{ marginBottom: "16px" }} />
          <Box
            paddingX="24px"
            sx={{ display: "flex", justifyContent: "space-between" ,alignItems:"center"}}
          >
             <StyledTypography1 onClick={()=>{setOpen(true)}}>Delete Account</StyledTypography1>
            <StyledButton
              variant="contained"
              disabled={!isEdited}
              onClick={handleSaveChanges}
            
            >
              Save Changes
            </StyledButton>
          </Box>
        </Box>
      </StyledGrid>
    </Container>
    </>
  );
};

export default Details;
