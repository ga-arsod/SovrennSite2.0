import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Typography, Stepper, Step, StepLabel, styled } from '@mui/material';
import { colors } from '../Constants/colors';
import { fieldOptions } from '@/utils/Data';

// Step labels
const steps = ['Details', 'Result'];

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
`;

const Divider = styled(Box)`
  width: 2px;
  background-color: ${colors.neutral500}; 
  margin: 0 40px;
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

// Custom Step Icon
const CustomStepIcon = (props) => {
  const { active, completed } = props;

  return (
    <Box
      sx={{
        width: 24, // Size of the outer circle
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF', // White background for the outer circle
        border: '2px solid red',
        borderColor: completed || active ? '#00BFA5' : '#BDBDBD', // Green for active/completed, grey for inactive
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: 2, // Size of the inner dot
          height: 2,
          backgroundColor: completed || active ? '#00BFA5' : '#BDBDBD', // Green dot for active/completed, grey for inactive
          borderRadius: '50%',
        }}
      />
    </Box>
  );
};

const SelfHelpForm = ({ selectedChip }) => {
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const selectedForm = 
    selectedChip === "Large Order" ? "largeOrder" :
    selectedChip === "Preferential" ? "preferential" :
    selectedChip === "Uptrend" ? "uptrend" :
    "capacityExpansion";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  useEffect(() => {
    const requiredFields = [...fieldOptions[selectedForm].companyData, ...fieldOptions[selectedForm].orderData];
    const isValid = requiredFields.every(field => formData[field.name] && formData[field.name].trim() !== '');
    setIsFormValid(isValid);
  }, [formData, selectedForm]);

  return (
    <Box width="100%">
      {/* Stepper */}
      <Stepper 
        activeStep={0} 
        alternativeLabel 
        sx={{ 
          marginTop: 5, 
          marginX: 'auto', 
          width: '100%', 
          maxWidth: '400px',
          '& .MuiStepConnector-line': {
            borderTopWidth: '2px',
            borderColor: '#BDBDBD', // Light grey connector
          },
          '& .MuiStepLabel-label': {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#344054',
            '&.Mui-active': {
              color: colors.themeGreen,  // Green for active
            },
            '&.Mui-completed': {
              color: colors.themeGreen,  // Green for completed
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

      {/* Dynamic Form Fields */}
      <Grid container spacing={3} marginTop={6} justifyContent="center" width="100%">
        <Grid item xs={12} sm={6}>
          <StyledTypography1 marginBottom={5}>Company Data</StyledTypography1>
          {fieldOptions[selectedForm].companyData.map((field, index) => (
            <Box key={index} marginTop={3}>
              <StyledInputLabel htmlFor={field.name}>{field.label}</StyledInputLabel>
              <StyledTextField
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            </Box>
          ))}
        </Grid>

        <Grid item xs={12} sm={6}>
          <StyledTypography1 marginBottom={5}>Order Data</StyledTypography1>
          {fieldOptions[selectedForm].orderData.map((field, index) => (
            <Box key={index} marginTop={3}>
              <StyledInputLabel htmlFor={field.name}>{field.label}</StyledInputLabel>
              <StyledTextField
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Calculate Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <StyledButton
          size="large"
          sx={{ width: '400px' }}
          disabled={!isFormValid}
        >
          Calculate
        </StyledButton>
      </Box>
    </Box>
  );
};

export default SelfHelpForm;