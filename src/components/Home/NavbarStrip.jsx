"use client"; // Ensure this runs on the client side

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledTypography1 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap; /* Prevent wrapping on larger screens */

  @media (max-width: 639px) {
    font-size: 10px;
    line-height: 12px;
    white-space: normal; /* Allow wrapping on small screens */
    display: block;
  }
`;

const NavbarStrip = () => {
  const pathname = usePathname();
  
 
  if (pathname !== "/") return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundImage: `url('/rectangle.png')`,
        zIndex: 999,
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: 1,
      }}
    >
      <StyledTypography1 color="#034635">
        <Box component="span" sx={{ display: "inline-block", textAlign: "center" }}>
          For any help Email us at:{" "}
          <span style={{ fontWeight: "bold" }}>help@sovrenn.com</span>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: "block", sm: "inline-block" }, 
            textAlign: "center",
            marginLeft: { xs: 0, sm: 1 }, 
          }}
        >
          {" or "} Whatsapp us at:{" "}
          <span style={{ fontWeight: "bold" }}>+91 9651081944</span>
        </Box>
      </StyledTypography1>
    </Box>
  );
};

export default NavbarStrip;
