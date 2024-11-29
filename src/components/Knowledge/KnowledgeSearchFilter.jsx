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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import SearchBar from "../../components/Common/SearchBar";
import { useRouter, useSearchParams } from "next/navigation";

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

const CustomTabs = styled(Tabs)`
  min-height: 40px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap; 
  padding: 0 10px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    height: 6px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey300};
    border-radius: 3px;
  }
`;

const CustomTab = styled(Tab)`
  text-transform: none;
  min-width: 0;
  margin-right: 15px;
  font-size: 18px;
  font-weight: 600;
  padding: 6px 10px;
  color: ${colors.greyBlue300};
  white-space: nowrap; 

  &:hover {
    color: ${colors.themeGreen};
  }

  &.Mui-selected {
    color: ${colors.themeGreen};
  }
`;

const KnowledgeSearchFilter = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategorySlug = searchParams.get("category"); 

  const [value, setValue] = useState(
    categories.findIndex((cat) => cat.attributes.slug === selectedCategorySlug) || 0
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedSlug = categories[newValue]?.attributes?.slug || null;

    // Update the URL search params to trigger server component re-render
    const params = new URLSearchParams(window.location.search);
    if (selectedSlug) {
      params.set("category", selectedSlug);
    } else {
      params.delete("category");
    }

    // Push updated URL
    router.push(`/knowledge?${params.toString()}`); 
    
  };

  return (
    <Container>
      <Box>
        {/* <Grid
          container
          sx={{
            alignItems: "space-between",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
            spacing: 5,
            flexDirection: "column",
            display: { xs: "block", sm: "none" },
          }}
        >
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              size="small"
              sx={{ mr: 2, width: "100%" }}
            >
              <StyledSelect
              
                displayEmpty
                inputProps={{ "aria-label": "Sort by" }}
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="Latest">Latest</MenuItem>
                <MenuItem value="Oldest">Oldest</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }} marginTop={1}>
            <SearchBar placeholder="Search for company, sector, or industry" />
          </Grid>
        </Grid> */}
        <Box sx={{ width: "100%" }}>
          <CustomTabs value={value} onChange={handleChange} aria-label="nav tabs" 
          variant="scrollable"
          scrollButtons={false}
 
  >
            {categories.map((category, index) => (
              <CustomTab key={index} label={category.attributes.name} />
            ))}
          </CustomTabs>
        </Box>
      </Box>
    </Container>
  );
};

export default KnowledgeSearchFilter;
