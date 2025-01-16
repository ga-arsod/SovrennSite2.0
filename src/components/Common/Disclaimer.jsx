import React from "react";
import { Typography, Box } from "@mui/material";
import styled from "@emotion/styled";



const Disclaimer = ({ margin, text }) => {
  return (
    <Box marginBottom={4} marginTop={margin} width="100%" >
      
      <Typography
      
        sx={{
          color: '#8EA7BB',
          fontWeight: '400',
        
          marginLeft: '4px', 
          textAlign: "left",
        }}
        
      >
       <span style={{ color: '#657785', fontWeight: '600'}}> DISCLAIMER:</span> {text}
      </Typography>
    </Box>
  );
};

export default Disclaimer;