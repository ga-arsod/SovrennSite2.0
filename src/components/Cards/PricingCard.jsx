"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Box,
  Button,
  Radio,
  Container,
  FormControlLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import { DoneOutlined, Insights, Star, Public, Group, ExploreOutlined, Groups2Outlined } from "@mui/icons-material";
import { colors } from "../Constants/colors";


const StyledButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: white;
  padding: 14px;
  background-color: ${colors.themeGreen};
  &:hover {
    background-color: ${colors.themeButtonHover};
  }
`;
const StyledButton2 = styled(Button)`
  text-transform: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #344054;
  padding: 14px;
  border: 1px solid #d0d5dd;
`;

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.04em;
   @media (max-width: 639px) {
    font-size: 34px;
    font-weight: 600;
    line-height: 40px;
   
  }
`;

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;

const StyledCard = styled(Card)`
 
  width: 400px;
  position: relative; 
`;

const StyledTypography = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
`;

const PriceTypography = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
`;

const DiscountTypography = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: line-through;
`;

const PopularBadge = styled(Box)`
  background-color: #20365b;
  color: white;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  padding: 4px 8px;
  border-radius: 2px;
  position: absolute;
  top: -3px;
  right: -2px;
`;

const FullWidthBadge = styled(Box)`
  background: linear-gradient(45deg, #034635 0%, #06a77d 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 12px 0;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0;
`;


const plansData = [
  {
    id: 1,
    title: "Free Access",
    pack_type: "Only Sovrenn Times",
    price: "₹0",
    durationOptions: [{ id: "a", label: "1 Month", price: "₹0", discountPrice: "" }],
    featuresLabel: "Limited to 10 Combined Actions per month of the following:",
    features: ["All Free Features", "Sovrenn Times", "Sovrenn Prime", "Sovrenn Discovery", "Sovrenn IPO", "Promoter Interviews", "Community"],
    actionLabel: "Buy Now",
    contactLabel: "Contact Sales",
  },
  {
    id: 2,
    title: "Full Access",
    secondary_title: "Most Popular",
    pack_type: "All Sovrenn Products",
    price: "₹5,000",
    durationOptions: [
      { id: "b", label: "5 Years", price: "₹25,000", discountPrice: "₹35,000" },
      { id: "c", label: "1 Year", price: "₹5,000", discountPrice: "₹7,000", popular: true },
      { id: "d", label: "6 Months", price: "₹2,500", discountPrice: "₹3,500" },
    ],
    features: ["All Free Features", "Sovrenn Times", "Sovrenn Prime", "Sovrenn Discovery", "Sovrenn IPO", "Promoter Interviews", "Community"],
    actionLabel: "Extend Now",
    contactLabel: "Contact Sales",
  },
  {
    id: 3,
    title: "Times Access",
    pack_type: "Only Sovrenn Times",
    price: "₹365",
    durationOptions: [{ id: "e", label: "1 Year", price: "₹365", discountPrice: "₹1,000" }],
    notIncluded: [
      "Sovrenn Prime",
      "Sovrenn Discovery",
      "Sovrenn IPO",
      "Promoter Interviews",
      "Community",
    ],
    features: ["10 Combined Actions for overall Product", "All Free Features", "Sovrenn Times"],
    actionLabel: "Buy Now",
    contactLabel: "Contact Sales",
  },
];

const featureIcons = {
  "All Free Features": <DoneOutlined />,
  "Sovrenn Times": <Insights />,
  "Sovrenn Prime": <Star />,
  "Sovrenn Discovery": <Public />,
  "Sovrenn IPO": <ExploreOutlined />,
  "Promoter Interviews": <Group />,
  "Community": <Groups2Outlined />,
};

const PricingCard = () => {
  const [plans, setPlans] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setPlans(plansData); 
  }, []);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId); 
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="space-between" marginTop={2} alignItems="flex-end">
        {plans.map((plan,index) => (
          <Grid item key={plan.id} xs={12} sm={6} md={4} 
          
          sx={{
            display: "flex",
            justifyContent: "center",
            order: index === 1 ? { xs: -1, sm: 0 } : 0, 
          }}
          >
            <StyledCard
              sx={{
                border: "1px solid #E4E7EC",
                borderRadius: "16px",
                boxShadow: "0px 12px 16px -4px #1018281A",
                height: plan.id === 2 ? "800px" : "713px",
                marginBottom: "20px",
                position:"relative"
              }}
            >
           
              {plan.id === 2 && <FullWidthBadge>Most popular plan</FullWidthBadge>}

              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "600px" }}>
                <Box>
                  <StyledTypography1 align="center" sx={{ marginTop: plan.id === 2 ? "32px" : "0px" }}>{plan.title}</StyledTypography1>
                  <StyledTypography2 align="center" color="#667085">{plan.pack_type}</StyledTypography2>

                  <Box display="flex" justifyContent="flex-start" marginTop={4} width="100%">
                    <Box width="100%">
                      {plan.durationOptions.map((option) => (
                        <Box
                          key={option.id}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#F4F6F8",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            border: selectedOption === option.id ? "2px solid #06A77D" : "1px solid #EAECF0",
                            marginBottom: "8px",
                          }}
                        >
                          {option.popular && <PopularBadge>Popular</PopularBadge>}
                          <StyledTypography color={colors.navyBlue500}>{option.label}</StyledTypography>
                          <Box display="flex" alignItems="center">
                            <PriceTypography color={colors.navyBlue500}>{option.price}</PriceTypography>
                            {option.discountPrice && (
                              <DiscountTypography color={colors.greyBlue500} sx={{ marginLeft: "2px" }}>
                                {option.discountPrice}
                              </DiscountTypography>
                            )}
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={selectedOption === option.id}
                                  onChange={() => handleOptionChange(option.id)}
                                  sx={{   color: selectedOption === option.id ? "#12B76A" : colors.greyBlue500, "&.Mui-checked": { color: colors.themeGreen }, marginLeft: "0px" }}
                                />
                              }
                              sx={{ margin: 0 }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {plan.featuresLabel && (
                    <Typography marginTop={4} color={colors.red300} sx={{ fontWeight: '600', fontSize: "16px", lineHeight: "19px" }}>
                      Limited to 10 Combined Actions per month of the following:
                    </Typography>
                  )}

                  <Box sx={{ marginY: 1.5 }}>
                    {plan.features.map((feature, index) => (
                      <Box key={index} display="flex" alignItems="center">
                        <Box sx={{ marginRight: "8px" }}>
                          {featureIcons[feature]
                            ? React.cloneElement(featureIcons[feature], { sx: { fontSize: 20, color: "#BAC1CC" } })
                            : <DoneOutlined sx={{ fontSize: 22, color: "#BAC1CC" }} />}
                        </Box>
                        <Typography marginBottom={0.5} sx={{ color: colors.greyBlue500, fontWeight: "400", fontSize: "19px", lineHeight: "24px" }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {plan.notIncluded && (
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography color={colors.red300} sx={{ fontWeight: '600', fontSize: "16px", lineHeight: "19px" }} marginBottom={1}>
                        Not Included:
                      </Typography>
                      {plan.notIncluded.map((item, index) => (
                        <Box key={index} display="flex" alignItems="center">
                          <Box sx={{ marginRight: "8px" }}>
                            {featureIcons[item]
                              ? React.cloneElement(featureIcons[item], { sx: { fontSize: 20, color: "#BAC1CC" } })
                              : <DoneOutlined sx={{ fontSize: 22, color: "#BAC1CC" }} />}
                          </Box>
                          <Typography marginBottom={0.5} sx={{ color: colors.greyBlue500, fontWeight: "400", fontSize: "19px", lineHeight: "24px" }}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>

             
                <Grid
  container
  gap={2}
  justifyContent="center"
  sx={{
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
  
    width: "90%", 
  }}
>
  <Grid item xs={12}>
    <StyledButton
      fullWidth
      disabled={
        selectedOption === "" ||
        plan.durationOptions.some((opt) => opt.id === selectedOption) === false
      }
    >
      {plan.actionLabel}
    </StyledButton>
  </Grid>
  <Grid item xs={12}>
    <StyledButton2 fullWidth>{plan.contactLabel}</StyledButton2>
  </Grid>
</Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PricingCard;