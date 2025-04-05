import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import styles from "../../styles/searchDiscovery.module.css";
import convertToHtml from "@/utils/convertToHtml";
import Link from "next/link";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledButton = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 8px 16px;
  text-transform: none;
  background-color: #e6f6f2;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const Discovery = ({data}) => {
 
  return (
    <Box mt={2} mb={5}>
      <StyledTypography1 color={colors.navyBlue500}>
        Discovery
      </StyledTypography1>

      <Card
        elevation={0}
        sx={{ border: "1px solid #E0E0E0", borderRadius: 2,mt:2 }}
        
      >
        <CardContent>
          
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledTypography1
              color={colors.navyBlue500}
              sx={{ fontWeight: "700" }}
            >
            {data?.company_name}
            </StyledTypography1>
            
            <Link href={`/discovery/${data?.discovery_buckets[0].slug}/${data?.slug}`} target="_blank">
           
            <StyledButton variant="contained">Read More</StyledButton>
            </Link>
          </Box>

        <Box>
          <div id={styles.MainContainer}>
                                   {convertToHtml(data?.discovery_content)}
                                 </div>
        </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Discovery;
