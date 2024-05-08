import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

const StyledTypography1 = styled(Typography)`
  @media (max-width: 639px) {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`;
const StyledTypography2 = styled(Typography)`
  @media (max-width: 639px) {
    font-size: 11px;
    font-weight: 600;
    line-height: 13px;
  }
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
`;
const StyledTypography3 = styled(Typography)`
  @media (max-width: 639px) {
    font-size: 9px;
    font-weight: 400;
    line-height: 12px;
  }
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;
const CustomerCard = ({ element }) => {
  return (
    <Grid
      container
      bgcolor="#E8F6F5"
      sx={{
        height: "auto",
        width: { xs: "70vw", sm: "50vw", md: "25vw" },
        margin: "5px",
        borderRadius: "6px",
      }}
    >
      <Grid item padding={2}>
        <Grid container>
          <Grid item>
            <Image
              src="/quotation.png"
              alt="main-poster"
              width={75}
              height={47}
            />

            <StyledTypography1 color="#0D1726" gutterBottom>
              {element.description}
            </StyledTypography1>
            <Grid
              container
              spacing={{ xs: 2, sm: 3 }}
              marginTop={0}
              alignItems="center"
            >
              <Grid item spacing={3}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: { xs: "40px", sm: "80px" },
                    height: { xs: "40px", sm: "80px" },
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    alt="Rounded Image"
                    width={80}
                    height={80}
                    src={element.imagePath}
                    sx={{ padding: "6px" }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <StyledTypography2 component="div" color="#0D1726">
                      {element.name}
                    </StyledTypography2>
                    <StyledTypography3 component="div" color="#666666">
                      {element.date}
                    </StyledTypography3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerCard;
