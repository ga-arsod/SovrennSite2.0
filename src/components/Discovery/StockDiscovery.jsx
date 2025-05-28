"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  InputBase,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

const bucketData = [
  {
    title: "Excellent Results",
    description: "List of interesting stocks that have given excellent results",
    views: 250,
    companies: 150,
    image: "https://via.placeholder.com/300x150?text=Excellent+Results",
  },
  {
    title: "Preferential Issuance",
    description:
      "List of interesting stocks in the process of raising capital via Preferential Issuance",
    views: 250,
    companies: 150,
    image: "https://via.placeholder.com/300x150?text=Preferential+Issuance",
  },
  {
    title: "Capacity Expansion & New Product Launches",
    description:
      "List of interesting stocks that have given excellent results",
    views: 250,
    companies: 150,
    image: "https://via.placeholder.com/300x150?text=Expansion+and+Launches",
  },
];

const StockDiscovery = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ bgcolor: "#f7f8f9" }}>
      {/* Title and Subtitle */}
      <Box px={4} pt={2}>
        <Typography variant="h5" fontWeight={600}>
          Stock <span style={{ color: "#00a76f" }}>Discovery</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Explore our thematic buckets of stocks for capturing the decadal trends
          in your personal investment portfolio.
        </Typography>
      </Box>

      {/* Sticky Tabs + Search Bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0, // Change if your navbar height is different
          zIndex: 1201,
          bgcolor: "#f7f8f9",
          px: 4,
          py: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
              },
            }}
          >
            <Tab label="All" />
            <Tab label="Functional" />
            <Tab label="Sectoral" />
            <Tab label="Important Buckets" />
            <Tab label="My Buckets" />
          </Tabs>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: 1,
              px: 1,
              backgroundColor: "#fff",
              height: 40,
              flexShrink: 0,
            }}
          >
            <InputBase placeholder="Search for a bucket" sx={{ ml: 1 }} />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <Box px={4} py={3}>
        <Typography variant="h6" mb={2} fontWeight={600}>
          Functional
        </Typography>

        <Grid container spacing={3}>
          {bucketData.map((bucket, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={1}>
                <CardMedia
                  component="img"
                  height="140"
                  image={bucket.image}
                  alt={bucket.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {bucket.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                    mb={1}
                  >
                    {bucket.description}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <VisibilityIcon fontSize="small" />
                    <Typography variant="caption">
                      {bucket.views} views this week
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#00a76f", fontWeight: 500 }}
                  >
                    {bucket.companies} Companies are in this bucket →
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StockDiscovery;
