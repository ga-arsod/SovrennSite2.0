"use client";
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  Container,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import SearchBar from "../../components/Common/SearchBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WishlistButton = styled(Button)(({ theme }) => ({
  borderRadius: "4px",
  textTransform: "none",
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "24px",
  color: colors.greyBlue300,
  borderColor: colors.neutral600,
  padding: "6px 15px",
 
  
  "&:hover": {
    borderColor: colors.neutral600,
  },
  "&.MuiButton-contained": {
    backgroundColor: colors.themeGreen,
    color: "#fff",
    borderColor: colors.themeGreen,
  },
}));

const StyledSelect = styled(Select)`
  width: 140px;
   @media (max-width: 639px) {
   width: 100px;
  }
  & .MuiInputBase-root {
    padding: 6px 12px;
    font-size: 16px;
    color: ${colors.navyBlue200};
    border-radius: 8px;
  }

  & .MuiSelect-select {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: ${colors.greyBlue300};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${colors.navyBlue200};
  }
`;

const CustomTabs = styled(Tabs)({
  borderBottom: `1px solid ${colors.grey300}`,
  minHeight: "40px", // Reduced height
});

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  marginRight: theme.spacing(2),
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: "24px",
  padding: "6px 10px", // Adjust padding to reduce gap
  "@media (max-width: 639px)": {
    padding: "4px 2px",  // Adjusted padding for smaller screens
  },
  color: colors.greyBlue300,
  "&:hover": {
    color: colors.themeButtonHover,
  },
  "&.Mui-selected": {
    color: colors.themeGreen,
    fontWeight: 600,
  },
  indicatorColor: "transparent", // To hide default indicator color
}));

const KnowledgeSearchFilter = () => {
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState("Latest");
  const [clicked, setClicked] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    setSort(event.target.value);
  };

  const toggleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Container>
      <Box>
      <Grid
          container
          sx={{
            alignItems: "space-between",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
            spacing:5,
          flexDirection:'column',
            display:{xs:'block',sm:'none'}
          }}
        >
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              size="small"
              sx={{ mr: 2, width: "100%" }}
            >
              <StyledSelect
                value={sort}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ "aria-label": "Sort by" }}
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="Latest">Latest</MenuItem>
                <MenuItem value="Oldest">Oldest</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{display:'flex',justifyContent:'flex-end'}} marginTop={1}>
            <SearchBar placeholder="Search for company, sector, or industry" />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: "center",
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <CustomTabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs"
            sx={{ width: { xs: "100%", sm: "70%" } }}
            TabIndicatorProps={{
              sx: { height: "3px", borderRadius: "2px" } 
            }}
          >
            <CustomTab label="All" />
            <CustomTab label="Macro Economy" />
            <CustomTab label="Industry" />
            <CustomTab label="Investopedia" />
            <CustomTab label="Startup" />
            <CustomTab label="Chronicles" />
          </CustomTabs>
          <WishlistButton
            variant={clicked ? "contained" : "outlined"}
            startIcon={<FavoriteIcon />}
            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}
            onClick={toggleClick}
          >
            My Wishlist
          </WishlistButton>
        </Box>
        <Grid
  container
  sx={{
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
    display: { xs: 'none', sm: 'flex' },
    flexDirection: 'row',
    gap: 1,  // Adjust spacing between items if needed
  }}
>
  <Grid item xs="auto">
    <FormControl
      variant="outlined"
      size="small"
      sx={{ width: "auto" }}
    >
      <StyledSelect
        value={sort}
        onChange={handleSelectChange}
        displayEmpty
        inputProps={{ "aria-label": "Sort by" }}
        IconComponent={ExpandMoreIcon}
      >
        <MenuItem value="Latest">Latest</MenuItem>
        <MenuItem value="Oldest">Oldest</MenuItem>
      </StyledSelect>
    </FormControl>
  </Grid>
  <Grid item xs="auto" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <SearchBar placeholder="Search for company, sector, or industry" />
  </Grid>
</Grid>
      </Box>
    </Container>
  );
};

export default KnowledgeSearchFilter;