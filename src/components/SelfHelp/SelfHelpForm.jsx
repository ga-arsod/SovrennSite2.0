import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  styled,
  InputAdornment,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { colors } from "../Constants/colors";
import { fieldOptions } from "@/utils/Data";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { selfHelpCalculationApi } from "@/app/Redux/Slices/selfHelpSlice";
import { useSelector } from "react-redux";
// Step labels
const steps = ["Details", "Result"];

// Styled components
const StyledInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
  color: ${colors.navyBlue900};
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  
  & .MuiInputBase-root {
    font-size: 16px;
    color: #344054;
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

  & .MuiInputBase-input::placeholder {
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    color: ${colors.greyBlue300};
    opacity: 1;
  }

  /* Remove spinner in number input */
  & input[type="number"]::-webkit-outer-spin-button, 
  & input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none; 
    margin: 0;
  }

  & input[type="number"] {
    -moz-appearance: textfield; 
  }
`;




const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  & .MuiInputBase-root {
    font-size: 16px;
    color: #344054;
    border-radius: 8px;
    padding: 3px; 
  }
  & .MuiAutocomplete-clearIndicator {
    color: #d0d5dd !important; 
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
  & .MuiInputBase-input::placeholder {
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: ${colors.greyBlue300};
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-transform: none;
  padding-top: 12px;
  padding-bottom: 12px;
  border-color: ${colors.themeGreen};
  background-color: ${colors.themeGreen};
  &:hover {
    color: white;
    border-color: ${colors.themeButtonHover};
    background-color: ${colors.themeButtonHover};
  }
`;

const CustomStepIcon = (props) => {
  const { active, completed } = props;
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        border: "2px solid red",
        borderColor: completed || active ? "#00BFA5" : "#BDBDBD",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: 2,
          height: 2,
          backgroundColor: completed || active ? "#00BFA5" : "#BDBDBD",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};

const SelfHelpForm = ({ selectedChip,setCompanyId }) => {
  const dispatch= useDispatch();
  const { isCalculatedDataAvailable } = useSelector(
    (store) => store.selfHelp
  );
  const [activeStep, setActiveStep] = useState(0); 
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [inputData, setInputData] = useState({
    company_id: "",
    calculate_for: "",
    current_market_cap: 0,
    current_share_price: 0,
    ttm_sales: 0,
    ttm_net_profit: 0,
    fixed_asset_turnover: 0,
    lq_profit: 0,
    current_orderbook: 0,
    timeline: 0,
    fair_pe: 0,
    preferential_price: 0,
    pref_no_of_shares: 0,
    utilization_of_raised_capital: 0,
    percent_increase_in_capacity: 0,
  });

  const handleClearSearch = () => {
    setSearchText("");
    setSearchResults([]);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (!inputData.calculate_for) {
      return;
  }
  dispatch(selfHelpCalculationApi(inputData))
 
  }
 

  const handleChange = (ele) => {
    const { name, value } = ele.target;

    if (name !== "calculate_for" && value) {
      setInputData({
        ...inputData,
        [name]: +value,
      });
      return;
    }

    

    setInputData({
      ...inputData,
      [name]: value,
    });

    return;
  };

  const selectedForm =
    selectedChip === "Large Order"
      ? "largeOrder"
      : selectedChip === "Preferential"
      ? "preferential"
      : selectedChip === "Uptrend"
      ? "uptrend"
      : "capacityExpansion";

  const getSearchResults = async () => {
    const res = await fetch(
      `https://api.sovrenn.com/company/search?q=${searchText}`
    );

    const data = await res.json();

    if (res.ok && searchText.length !== 0) {
      setSearchResults(data.data);
      return;
    }

    setSearchResults([]);
    return;
  };

  useEffect(() => {
    if (isCalculatedDataAvailable) {
      setActiveStep(2);
    }
  }, [isCalculatedDataAvailable]);

  useEffect(() => {
    setInputData((prevData) => ({
      ...prevData,
      calculate_for: 
        selectedChip === "Large Order" 
          ? "large_order" 
          : selectedChip === "Preferential"  
          ? "preferential" 
          : selectedChip === "Uptrend" 
          ? "uptrend" 
          : "capacity_expansion",
    }));
  }, [selectedChip]);

  useEffect(() => {
    if (searchText.length === 0) {
      setSearchResults([]);
    } else {
      const debounce = setTimeout(() => {
        getSearchResults();
      }, 100);

      return () => clearTimeout(debounce);
    }

    return () => {
      setSearchResults([]);
    };
  }, [searchText]);

  useEffect(() => {
    if (searchText.length === 0) {
      setSearchResults([]);
    } else {
      const debounce = setTimeout(() => {
        getSearchResults();
      }, 100);

      return () => clearTimeout(debounce);
    }

    return () => {
      setSearchResults([]);
    };
  }, [searchText]);

  useEffect(() => {
    const requiredFields = [
      ...fieldOptions[selectedForm].companyData,
      ...fieldOptions[selectedForm].orderData,
    ];
    const isValid = requiredFields.every(
      (field) => formData[field.name] && formData[field.name].trim() !== ""
    );
    setIsFormValid(isValid);
  }, [formData, selectedForm]);

  return (
    <Box width="100%">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          marginTop: 5,
          marginX: "auto",
          width: "100%",
          maxWidth: "400px",
          "& .MuiStepConnector-line": {
            borderTopWidth: "2px",
            borderColor: "#BDBDBD",
          },
          "& .MuiStepLabel-label": {
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#344054",
            "&.Mui-active": {
              color: colors.themeGreen,
            },
            "&.Mui-completed": {
              color: colors.themeGreen,
            },
          },
        }}
        StepIconComponent={CustomStepIcon}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid
        container
    
       gap={{xs:2,sm:0}}
       spacing={{xs:0,sm:3}}
      
        justifyContent="center"
        width="100%"
      >
        <Grid item xs={12} sm={6} marginTop={2}>
          <StyledTypography1 marginBottom={3}>Company Data</StyledTypography1>
          {fieldOptions[selectedForm]?.companyData.map((field, index) => (
            <Box key={index} marginTop={3}>
              <StyledInputLabel htmlFor={field.name}>
                {field.label}
              </StyledInputLabel>
              { field.name && field.name === "company_name" ? (
                <StyledAutocomplete
                  id={field.name}
                  freeSolo
                  inputValue={searchText} 
                  onInputChange={(event, newInputValue) => {
                    setSearchText(newInputValue); 
                  }}
                  options={searchResults || []}
                  onChange={(props, option) => {
                    setCompanyId(option._id)
                    setInputData({
                      ...inputData,
                      company_id: option._id,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={searchText}
                      placeholder="Search for a company"
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: searchText ? (
                          <InputAdornment position="end">
                            <ClearIcon
                              onClick={handleClearSearch}
                              sx={{ cursor: "pointer", fontSize: "20px" }}
                            />
                          </InputAdornment>
                        ) : null,
                      }}
                    />
                  )}
                  getOptionLabel={(option) => option?.company_name || ""}
                  renderOption={(props, option) => (
                    <li key={option._id || option.company_name} {...props}>
                      {option.company_name}
                    </li>
                  )}
                />
              ) : (
                <StyledTextField
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  type="number"
                  value={inputData[field.name] }
                  onChange={handleChange}
                />
              )}
            </Box>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} marginTop={2}>
          <StyledTypography1 marginBottom={3}>{`${selectedChip} Data`}</StyledTypography1>
          {fieldOptions[selectedForm]?.orderData.map((field, index) => (
            <Box key={index} marginTop={3}>
              <StyledInputLabel htmlFor={field.name}>
                {field.label}
              </StyledInputLabel>
              <StyledTextField
                id={field.name}
                name={field.name}
                type="number"
                placeholder={field.placeholder}
                required
                value={inputData[field.name]}
                onChange={handleChange}
              />
            </Box>
          ))}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <StyledButton
          size="large"
          sx={{ width: "400px" }}
         
          onClick={handleSubmit}
        >
          Calculate
        </StyledButton>
      </Box>
    </Box>
  );
};

export default SelfHelpForm;
