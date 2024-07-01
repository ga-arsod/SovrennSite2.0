"use client"
import React,{useState} from "react";
import styled from "@emotion/styled";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { colors } from "../Constants/colors";
import LanguageModal from "../Modal/LanguageModal";

const tutorialArray = [
  {
    image: "/green.svg",
    description: "Identifying Potential Multibaggers",
  },
  {
    image: "/green.svg",
    description: "Price Targets, Valuation and Float Analysis",
  },
];

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.04em;
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
  }
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
`;

const TutorialSection = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    {
      open ? <LanguageModal open={open} handleClose={handleClose}/> : <></>
    }
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
         paddingY={{xs:3,md:6}}
        >
          <Grid item marginBottom={2}>
            <Typography
              sx={{ textAlign: "center" }}
              paddingX={{ xs: 2, sm: 0 }}
            >
              <StyledTypography1
                component="span"
                marginRight={1}
                color={colors.headingColor}
              >
                Videos to help you kickstart your investing
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                journey
              </StyledTypography1>
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="center" marginBottom="28px">
            <StyledTypography2
              textAlign="center"
             
              color={colors.greyBlue500}
              paddingX={{ xs: 2, sm: 0 }}
             
            >
              You can understand the basics of investing with these two videos
            </StyledTypography2>
          </Grid>
          <Grid
            item
           
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              direction: { xs: "row", sm: "column" },
            }}
          >
            <Grid
              container
              paddingY={2}
              paddingX={4}
              gap={2}
              direction={{ xs: "column", sm: "row" }}
              width={{ xs: "100%", md: "85%" }}
              justifyContent="space-between"
            >
              {tutorialArray.map((element, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    sm={5.7}
                    sx={{ border: "1px solid #E4E7EC", borderRadius: "12px" }}
                  >
                    <Box sx={{ position: 'relative', borderRadius: "12px", overflow: "hidden" }}>
            <Image
              src={element.image}
              alt="..."
              width={380}
              height={350}
              layout="responsive"
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px', 
                height: '80px', 
                cursor:"pointer"
              }}
              onClick={handleOpen}
            >
              <Image
                src="/play.svg" 
                alt="overlay"
                layout="fill"
                objectFit="contain" 
              />
            </Box>
          </Box>


                    <StyledTypography3
                      color="#101828"
                      marginLeft={3}
                      paddingY={3}
                      
                    >
                      {element.description}
                    </StyledTypography3>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TutorialSection;
