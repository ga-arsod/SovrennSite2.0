import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";

const StyledChip = styled(Chip)`
  font-size: 14px;
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

const chipsArray = [{
  name:"Large Order",
  label:"large_order"
},{
  name:"Preferential",
  label:"referential"
},
{
  name:"Uptrend",
  label:"uptrend"
}, 
{
  name:"Capacity Expansion",
  label:"capacity_expansion"
},
];

const SelfHelpChips = ({ onChipSelect, selectedChip,justify }) => {
  const [selectedChipComp, setSelectedChipComp] = useState(selectedChip);

  const handleChipClick = (chip) => {
    setSelectedChipComp(chip.name);
    onChipSelect(chip.name); 
  };

  return (
    <Box 
      sx={{
        display: "flex",
        flexWrap: "wrap", 
        gap: 1,
      
        maxWidth: "100%", 
        justifyContent:justify,
        boxSizing: "border-box",
      }}
    >
      {chipsArray.map((item, index) => (
        <StyledChip
          key={index}
          label={item.name}
          variant="outlined"
          onClick={() => handleChipClick(item)}
          selected={selectedChipComp ==item.name}
        />
      ))}
    </Box>
  );
};

export default SelfHelpChips;