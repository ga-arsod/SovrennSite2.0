import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";

const StyledChip = styled(Chip)`
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  color: ${colors.greyBlue400};
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #034635 !important;
    color: white;
  }

  ${({ selected }) =>
    selected &&
    `
    background-color: ${colors.themeGreen} !important;
    color: white !important;
    border: none;
  `}
`;

const chipsArray = ["Large Order", "Preferential", "Uptrend", "Capacity Expansion"];

const SelfHelpChips = ({ onChipSelect, selectedChip }) => {
  const [selectedChipComp, setSelectedChipComp] = useState(selectedChip);

  const handleChipClick = (chip) => {
    setSelectedChipComp(chip);
    onChipSelect(chip); 
  };

  return (
    <Box 
      sx={{
        display: "flex",
        flexWrap: "wrap", 
        gap: 1,
        maxWidth: "100%", 
        boxSizing: "border-box",
      }}
    >
      {chipsArray.map((item, index) => (
        <StyledChip
          key={index}
          label={item}
          variant="outlined"
          onClick={() => handleChipClick(item)}
          selected={selectedChipComp === item}
        />
      ))}
    </Box>
  );
};

export default SelfHelpChips;