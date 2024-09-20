"use client";
import React, { useState } from "react";
import { Grid, Button, Container } from "@mui/material";

import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchBar from "../Common/SearchBar";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Filters from "../Common/Filters";

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  border-color: ${colors.navyBlue500};
  &:hover {
    background-color: ${colors.navyBlue200};
    color: white;
    border-color: ${colors.navyBlue200};
  }
`;
const StyledFilterIcon = styled(FilterAltOutlinedIcon)`
  && {
    font-size: 16px;
    color: ${colors.navyBlue500};
  }
`;

const PrimeFilters = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  return (
  <>
      {!isSmallerThanSm && (
        <Grid
          container
          justifyContent="space-between"
          width="100%"
          marginTop={5}
        >
          <Grid item>
            <StyledButton
              variant="outlined"
              endIcon={<StyledFilterIcon />}
              size="small"
              onClick={toggleDrawer(true)}
            >
              Filter
            </StyledButton>
          </Grid>

          <Grid item>
            <SearchBar
              placeholder={"Search for company, sector, or industry"}
            />
          </Grid>
        </Grid>
      )}

      <Filters isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
  );
};

export default PrimeFilters;
