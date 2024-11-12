"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  Typography,
  Modal,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { bucketFormConfig } from "@/utils/Data";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { createCustomBucketApi } from "@/app/Redux/Slices/discoverySlice";
import DeleteBucketCreation from "../../components/Modal/DeleteBucketCreation";
import { commonCompanyListApi } from "@/app/Redux/Slices/discoverySlice";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 33px;
  line-height: 40px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
  }
`;
const StyledTypography2 = styled(Typography)`
  @media (max-width: 639px) {
    font-size: 14px;

    line-height: 17px;
  }
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInputLabel = styled(InputLabel)`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.navyBlue800};
`;

const StyledButton2 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width: 100%;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
`;
const StyledChip = styled(Chip)`
  margin: 5px;
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${colors.navyBlue500};
  .MuiChip-label {
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: ${colors.white};
    padding-left: 4px;
  }
`;

const CreateBucketModal = ({ open, handleClose }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const options = useSelector((store) => store.discovery.commonCompanyList);

  const { customBucketData, isCreateBucketModalOpen } = useSelector(
    (store) => store.discovery
  );

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bucket_list: [],
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
      setFormData({ ...formData, bucket_list: [...selectedOptions, value] });
    }
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  useEffect(() => {
    dispatch(commonCompanyListApi(formData.bucket_list));
  }, [formData,dispatch]);
  console.log(isCreateBucketModalOpen, "isCreateBucketModalOpen");
  console.log(customBucketData, "customBucketData");
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <>
            <StyledInputLabel marginBottom="4px">
              {field.label}
            </StyledInputLabel>
            <TextField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "10px 8px",
                  color: colors.navyBlue900,
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "21px",
                  "@media (max-width: 639px)": {
                    fontSize: "14px",
                    lineHeight: "17px",
                  },

                  "&::placeholder": {
                    color: colors.greyBlue300,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "21px",
                    "@media (max-width: 639px)": {
                      fontSize: "14px",
                      lineHeight: "17px",
                    },
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.60rem",
                },
              }}
            />
          </>
        );
      case "select":
        return (
          <>
            <StyledInputLabel id={field.name}>{field.label}</StyledInputLabel>
            <Select
              labelId={field.name}
              id={field.name}
              value=""
              onChange={handleSelectChange}
              renderValue={(selected) => {
                if (!selected || selected.length === 0) {
                  return (
                    <StyledTypography2
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        lineHeight: "21px",
                        color: colors.greyBlue300,
                      }}
                      data-custom="true"
                    >
                      {isSmallerThanSm
                        ? "Search for a bucket list ( Min. two)"
                        : "Search for bucket list (Select atleast two)"}
                    </StyledTypography2>
                  );
                }
                return selected;
              }}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "10px 8px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.60rem",
                },
              }}
              variant="outlined"
              displayEmpty
              fullWidth
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    zIndex: 1400,
                  },
                },
              }}
            >
              {options?.map((elem, index) => (
                <MenuItem
                  key={elem.bucket_name}
                  value={elem.bucket_name}
                  sx={{
                    color: selectedOptions.includes(elem.bucket_name)
                      ? colors.navyBlue100
                      : colors.navyBlue900,
                    borderWidth: "1px 1px 0 1px",
                    borderStyle: "solid",
                    borderColor: "#DEDDDD",
                    "&:last-child": {
                      borderWidth: "1px",
                    },
                    "&:hover": {
                      backgroundColor: colors.navyBlue50,
                    },
                    ...(index === 0 && {
                      backgroundColor: "transparent !important",
                      "&:hover": {
                        backgroundColor: `${colors.navyBlue50} !important`,
                      },
                    }),
                  }}
                >
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Grid item>{elem.bucket_name}</Grid>
                    
                    <Grid item>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "14px",
                        }}
                        color={colors.green500}
                      >
                        {
                      formData.bucket_list.length!==0 ? elem.companies_in_common :''
                    }
                        
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </Select>
            <Box mt={2} display="flex" flexWrap="wrap">
              {selectedOptions.map((option) => (
                <StyledChip
                  key={option}
                  label={option}
                  icon={
                    <IconButton
                      onClick={() => handleRemoveOption(option)}
                      // sx={{

                      // width:'16px',
                      // height:'16px',
                      //   border:'2.5px solid #FFFFFF',
                      //   borderRadius:'50%'
                      // }}
                    >
                      <HighlightOffSharpIcon
                        sx={{
                          color: colors.white,
                          fontSize: "24px",
                          fontWeight: "600",
                        }}
                      />
                    </IconButton>
                  }
                  sx={{
                    color: colors.white,
                    margin: "5px",
                    backgroundColor: colors.navyBlue500,
                    "& .MuiChip-deleteIcon": {
                      color: colors.white,
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "14px",
                    },
                  }}
                />
              ))}
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {open ? (
        <DeleteBucketCreation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClose={handleClose}
        />
      ) : (
        <></>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ border: "none", outline: "none" }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            border: "none",
            outline: "none",
          },
        }}
      >
        <StyledBox>
          <Box
            bgcolor={colors.white}
            width={{ xs: "90%", sm: "680px" }}
            height="auto"
            sx={{
              boxShadow: "0px 12px 24px 0px #0000001A",
              position: "relative",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: "6px", right: "4px" }}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <CloseIcon sx={{ color: colors.black, zIndex: 1400 }} />
            </IconButton>
            <Grid
              container
              paddingTop={{ xs: 4, sm: 5 }}
              paddingBottom="28px"
              paddingX={{ xs: "28px", sm: "54px" }}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                sx={{ display: "flex", justifyContent: "center" }}
                width="100%"
                marginBottom={4}
              >
                <StyledTypography1>Add Bucket Details</StyledTypography1>
              </Grid>
              <Grid item width="100%">
                <Grid container direction="column">
                  {bucketFormConfig.map((field) => (
                    <Grid item key={field.name} marginBottom={2} width="100%">
                      {renderField(field)}
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item width="100%" marginTop={{ xs: 1, sm: 3 }}>
                {!customBucketData?.success ? (
                  <Typography
                    style={{ color: "red" }}
                    paddingBottom={1}
                    textAlign="center"
                  >
                    {customBucketData?.message}
                  </Typography>
                ) : (
                  ""
                )}

                <StyledButton2
                  variant="contained"
                  onClick={() => {
                     dispatch(
                      createCustomBucketApi(formData)
                    );

                   
                  }}
                  disabled={selectedOptions.length < 2}
                >
                  Create Bucket List
                </StyledButton2>
              </Grid>
            </Grid>
          </Box>
        </StyledBox>
      </Modal>
    </>
  );
};

export default CreateBucketModal;
