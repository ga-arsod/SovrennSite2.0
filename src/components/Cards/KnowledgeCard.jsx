"use client";
import React, { useState } from "react";
import { Grid, Typography, Box, Button, IconButton, Container } from "@mui/material";
import styled from "@emotion/styled";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { colors } from "../Constants/colors";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Styled components
const StyledTypographyDate = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  font-weight: 14px;
  color: ${colors.greyBlue500};
`;

const StyledTypographyTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  margin: 8px 0;
`;

const StyledTypographyCategory = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
  color: ${colors.green900};
  font-weight: 600;
  padding: 4px 8px;
  background-color: ${colors.green50};
  border-radius: 4px;
  display: inline-block;
`;

const StyledIconButton = styled(IconButton)`
  border: 1px solid ${colors.grey500};
  border-radius: 50%;
  padding: 5px;
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-transform: none;
  color: ${colors.navyBlue500};
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #B0B7BC;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s;
  /* Add transition for all properties */

  .arrow-icon {
    color: #3c464f;
    font-size: 16px;
  }
`;

const StyledCard = styled(Box)`
  max-width: 678px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  transition: transform 0.3s;
  
  &:hover {
    // transform: scale(1.02);
    
    .custom-icon-button {
      background-color: ${colors.themeGreen};
      border-color: ${colors.navyBlue900};
      transform: rotate(-45deg);

      .arrow-icon {
        color: ${colors.white};
        font-size:14px;
      }
    }
  }
`;

const KnowledgeCard = () => {
  const [likedCards, setLikedCards] = useState(Array(12).fill(false));

  const handleLikeToggle = (index) => {
    setLikedCards((prevLikedCards) =>
      prevLikedCards.map((liked, i) => (i === index ? !liked : liked))
    );
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} marginTop={1}>
        <Grid
          container
          marginBottom={5}
          justifyContent="center"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
            padding: { xs: 1 },
          }}
        >
          {Array.from("abcderhjkjkk").map((item, index) => (
            <StyledCard key={index}>
              <Grid container justifyContent="space-between" alignItems="center">
                <StyledTypographyDate>20 Jan 2022</StyledTypographyDate>
                <StyledIconButton onClick={() => handleLikeToggle(index)}>
                  {likedCards[index] ? (
                    <FavoriteIcon style={{ color: colors.red500, fontSize: "14px" }} />
                  ) : (
                    <FavoriteBorderIcon style={{ fontSize: "14px" }} />
                  )}
                </StyledIconButton>
              </Grid>
              <StyledTypographyTitle color="#101828">
                Revitalizing Agriculture: ₹22,303 Crore Subsidy Boosts Farmers with P&K Fertilizers
              </StyledTypographyTitle>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <StyledTypographyCategory>Industry</StyledTypographyCategory>
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <StyledButton size="small" variant="text" color="primary">
                    Read More
                  </StyledButton>
                  <CustomIconButton className="custom-icon-button">
                    <ArrowForwardIcon
                      fontSize="small"
                      className="arrow-icon"
                      sx={{ fontSize: "16px" }}
                    />
                  </CustomIconButton>
                </Grid>
              </Grid>
            </StyledCard>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default KnowledgeCard;