"use client"
import { useState, useEffect } from "react";
import { Button, IconButton, Box, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const pagesToShow = 5; // Number of pages to show in each batch

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextArrowClick = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      if (nextPage > startPage + pagesToShow - 1) {
        setStartPage(startPage + pagesToShow);
      }
    }
  };

  const handlePrevArrowClick = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      if (prevPage < startPage) {
        setStartPage(startPage - pagesToShow);
      }
    }
  };

  const handleJumpForward = () => {
    const nextStartPage = startPage + pagesToShow;
    if (nextStartPage <= totalPages) {
      setStartPage(nextStartPage);
      setCurrentPage(nextStartPage);
    }
  };

  const handleJumpBackward = () => {
    const prevStartPage = startPage - pagesToShow;
    if (prevStartPage >= 1) {
      setStartPage(prevStartPage);
      setCurrentPage(prevStartPage);
    }
  };

  const renderPages = () => {
    let pages = [];
    let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
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
            backgroundColor:
              i === currentPage ? colors.navyBlue500 : "transparent",
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
    console.log(startPage, "start Page");
  }, [currentPage, startPage]);

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" marginTop={5} marginBottom={12}>
      <IconButton
        onClick={handleJumpBackward}
        disabled={startPage <= 1}
        sx={{ color: startPage <= 1 ? "#CCCCCC" : "#000000" }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={handlePrevArrowClick}
        disabled={currentPage <= 1}
        sx={{ color: currentPage <= 1 ? "#CCCCCC" : "#000000" }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {renderPages()}
      {startPage + pagesToShow <= totalPages && (
        <>
       <StyledTypography
              sx={{ color:  "#333333" }}
              component="span"
              marginRight="5px"
            >
            ...
            </StyledTypography>
          <Button
            variant={currentPage === totalPages ? "contained" : "outlined"}
            onClick={() => handlePageClick(totalPages)}
            size="small"
            sx={{
              borderRadius: "8px",
              border: "1px solid #F1F1F1",
              padding: "8px",
              backgroundColor:
                currentPage === totalPages ? colors.navyBlue500 : "transparent",
              minWidth: "36px",
              marginRight: "5px",
              "&:hover": {
                backgroundColor: colors.neutral600,
                borderColor: colors.neutral600,
              },
            }}
          >
            <StyledTypography
              sx={{ color: currentPage === totalPages ? "#FFFFFF" : "#333333" }}
              component="span"
            >
              {totalPages}
            </StyledTypography>
          </Button>
        </>
      )}
      <IconButton
        onClick={handleNextArrowClick}
        disabled={currentPage >= totalPages}
        sx={{ color: currentPage >= totalPages ? "#CCCCCC" : "#000000" }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton
        onClick={handleJumpForward}
        disabled={startPage + pagesToShow >= totalPages}
        sx={{
          color: startPage + pagesToShow >= totalPages ? "#CCCCCC" : "#000000",
        }}
      >
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;