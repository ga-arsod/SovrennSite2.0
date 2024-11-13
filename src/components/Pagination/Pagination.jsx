"use client"
import { useState, useEffect } from "react";
import { Button, IconButton, Box, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Pagination = ({ currentPage, setCurrentPage }) => {
  const { pagination } = useSelector((store) => store.discovery);
  const totalPages = pagination?.total_pages;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextArrowClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevArrowClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "contained" : "outlined"}
          onClick={() => handlePageClick(i)}
          size="small"
          sx={{
            borderRadius: "8px",
            border: "1px solid #F1F1F1",
            padding: "8px",
            backgroundColor: i === currentPage ? colors.navyBlue500 : "transparent",
            minWidth: "36px",
            marginRight: "5px",
            "&:hover": {
              backgroundColor: colors.neutral600,
              borderColor: colors.neutral600,
            },
          }}
        >
          <StyledTypography
            sx={{ color: i === currentPage ? "#FFFFFF" : "#333333" }}
            component="span"
          >
            {i}
          </StyledTypography>
        </Button>
      );
    }
    return pages;
  };

  useEffect(() => {
    console.log(currentPage, "current page");
  }, [currentPage]);

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" marginTop={5} marginBottom={12}>
      <IconButton
        onClick={handlePrevArrowClick}
        disabled={currentPage <= 1}
        sx={{ color: currentPage <= 1 ? "#CCCCCC" : "#000000" }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {renderPages()}
      <IconButton
        onClick={handleNextArrowClick}
        disabled={currentPage >= totalPages}
        sx={{ color: currentPage >= totalPages ? "#CCCCCC" : "#000000" }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
