import React from "react";
import { Typography, Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledTypography = styled(Typography)`
  text-align: justify;
`;

const Disclaimer = ({ margin, text, width }) => {
  return (
    <Box marginBottom={4} marginTop={margin} width={width ? width : "100%"} paddingX={2}>
      <StyledTypography sx={{ color: '#657785', fontWeight: '600', display: 'inline' }}>
        DISCLAIMER:
      </StyledTypography>
      <StyledTypography
        sx={{
          color: '#8EA7BB',
          fontWeight: '400',
          display: 'inline',
          marginLeft: '4px', 
        }}
        component="span"
      >
        {text}
      </StyledTypography>
    </Box>
  );
};

export default Disclaimer;