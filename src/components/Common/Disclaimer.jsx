import React from "react";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { Grid ,Typography} from "@mui/material";

const StyledTypography1 = styled(Typography)`
 
  font-size: 16px;
  line-height: 19px;
 
`;
const Disclaimer = () => {
  return (
    <>
      <Grid container marginBottom={4} justifyContent='center'>
        <Grid item width="915px">
          <StyledTypography1 sx={{color:'#657785',fontWeight:'600'}} component="span">{`DISCLAIMER: `}</StyledTypography1>
          <StyledTypography1 sx={{color:'#8EA7BB',fontWeight:'400'}} component="span">
            This document is created for educational and
            informational purposes only and should not be construed as a
            Buy/Sell recommendation, investment advice or a research report.
            Although the document accurately reflects the personal views of the
            authors,there may be manual/ human errors in the document. The
            authors may also have equity shares in the companies mentioned in
            this report. Investor is advised to consult his/her investment
            advisor and undertake further due diligence before making any
            investment decision in the companies mentioned. Authors are not
            liable for any financial gains or losses due to investments made as
            per the information written in this document.
          </StyledTypography1>
        </Grid>
      </Grid>
    </>
  );
};

export default Disclaimer;
