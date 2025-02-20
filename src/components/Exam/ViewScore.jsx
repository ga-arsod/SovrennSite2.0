import React, { useState, useEffect } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import DoneIcon from "@mui/icons-material/Done";
import TimerIcon from "@mui/icons-material/Timer";
import { colors } from "../Constants/colors";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { submitExamApi } from "@/app/Redux/Slices/examSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";


const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  padding: "4px 8px",
  fontSize: "16px",
  color: "#4D5E7C",
});

const Dot = styled(Box)({
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  backgroundColor: "#4D5E7C",
  margin: "0 8px",
});

const StyledTypography1 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
  color: "#1C1C1C";
`;

const StyledFormControl = styled(FormControl)({
  width: "100%",
  marginTop: "16px",
});

const StyledFormControlLabel = styled(FormControlLabel)(({ isSelected, isCorrect }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid",
    borderColor: isCorrect ? colors.themeGreen : isSelected && !isCorrect ? colors.themeGreen : "#E9EBEF",
    backgroundColor: isCorrect ? "#ECFAEC" : isSelected && !isCorrect  ? "#FEE6E6" : "#FFFFFF",
    borderRadius: "8px",
    margin: "8px 0",
    color: "red",
    padding: "8px 16px",
    width: "100%",
    transition: "border-color 0.3s, background-color 0.3s",
    "& .MuiTypography-root": {
      flexGrow: 1,
    },
    "& .MuiRadio-root": {
      color: "#8EA7BB",
      "&.Mui-checked": {
        color: colors.themeGreen,
      },
    },
  }));
  

const StyledLabelTypography = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #1c1c1c;
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 20px;
  background-color: ${colors.themeGreen};
  text-transform: none;
  width: 80%;
  margin-bottom: 20px;
  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
`;
const Span1 = styled.span`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  letter-spacing: -0.02em;
  color: #fb8935;
  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 26px;
  }
`;
const CustomFormControlLabel = ({ option, question }) => {
    const selectedOption = question.selected_option;
    const correctAnswer = question.correct_answer;
    const isSelected = selectedOption === option._id;
    const isCorrect = correctAnswer === option._id;
    const showCorrection = isSelected && !isCorrect; // User selected wrong option
  
    return (
      <StyledFormControlLabel
        control={<Radio checked={isSelected} />}
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StyledLabelTypography>{option.text}</StyledLabelTypography>
  
          
            {isSelected && (isCorrect ? (
              <DoneIcon sx={{ color: "#43CB43" }} /> 
            ) : (
              <CloseIcon sx={{ color: "red" }} /> 
            ))}
  
          
            {isCorrect && !isSelected && <DoneIcon sx={{ color: "#43CB43" }} />}
          </Box>
        }
        isSelected={isSelected}
      isCorrect={isCorrect}
        sx={{
          borderColor: isCorrect ? colors.themeGreen : showCorrection ? colors.themeGreen : "#E9EBEF",
          backgroundColor: isCorrect ? "#ECFAEC" : showCorrection ? "#FEE6E6" : "#FFFFFF",
        }}
      />
    );
  };
  

const ViewScore = ({setViewAnswers}) => {
  const { examAnswers, examQuestions } = useSelector((store) => store.exam);

  const formatTime = (seconds) => {
    
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
console.log(examAnswers?.time_taken,"exam anseers")
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        paddingTop={{ xs: "90px", md: "100px", lg: "100px" }}
        width="100%"
        flexDirection="column"
        alignItems="center"
        marginX={3}
      >
        <Grid
          item
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <MenuBookIcon fontSize="small" />
            <StyledTypography1 sx={{ ml: 1 }}>
              {`${examQuestions?.total_time / 60} Questions`}
            </StyledTypography1>
          </Box>
          <Dot sx={{ marginX: 3 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "8px 12px",
              borderRadius: "4px",
             

              width: "fit-content",
            }}
          >
            <TimerIcon  />
            <StyledTypography1  fontWeight={600}>
              {formatTime(examAnswers?.time_taken)}
            </StyledTypography1>
          </Box>
        </Grid>
        <Grid item marginTop={1} width={{ xs: "100%", md: "868px" }}>
          {examAnswers?.attempted_questions?.map((element, index) => {
            return (
              <Box marginTop={6} key={element._id}>
                <StyledTypography2 color="#1C1C1C">
                  {` ${index + 1}. ${element?.question_text[0]?.data?.text}`}
                </StyledTypography2>
                <StyledFormControl component="fieldset">
                <RadioGroup>
  {element.options?.map((option) => (
    <CustomFormControlLabel
      key={option._id}
      option={option}
      question={element}
    />
  ))}
</RadioGroup>
                </StyledFormControl>
              </Box>
            );
          })}
        </Grid>
        <Grid
                  item
                  marginTop={5}
                  width={{ xs: "100%", md: "868px" }}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledButton2
                    variant="contained"
                    type="submit"
                    onClick={()=>{
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setViewAnswers(false)}}
                  >
                   Done
                  </StyledButton2>
                </Grid>
      </Grid>
    </Box>
  );
};

export default ViewScore;
