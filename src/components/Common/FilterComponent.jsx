import React from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  Divider,
  Checkbox,
} from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.greyBlue500};
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    color: ${colors.navyBlue900};
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
  & .MuiCheckbox-root {
    padding: 8px;
  }
`;

const CustomCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: ${colors.navyBlue500};
  }
  & .MuiSvgIcon-root {
    border-radius: 4px;
  }
  &.MuiCheckbox-root {
    &.MuiCheckbox-indeterminate {
      color: ${colors.navyBlue500};
    }
  }
  &.MuiCheckbox-root:not(.Mui-checked):not(.MuiCheckbox-indeterminate) {
    color: ${colors.navyBlue500};
  }
`;

const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;



const FilterComponent = ({ data }) => {
  return (
    <>
      <StyledTypography1>{data.category}</StyledTypography1>
      <Grid container justifyContent="space-between" sx={{ width: "80%" }}>
        {data.options.map((elem, index) => {
          return (
            <>
              <Grid item key={index} xs={12}>
                <CustomFormControlLabel
                  control={<CustomCheckbox />}
                  label={elem.placeholder}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
      <CustomDivider sx={{ mt: 2, mb: 2 }} />
    </>
  );
};

export default FilterComponent;
