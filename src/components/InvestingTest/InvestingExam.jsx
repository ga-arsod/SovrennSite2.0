"use client";
import React, { useState, useEffect } from "react";
import { getInvestingQuestionsApi } from "@/app/Redux/Slices/investingSlice";
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toggleExamState } from "@/app/Redux/Slices/investingSlice";
import { submitInvestingExamApi } from "@/app/Redux/Slices/investingSlice";
import CustomSnackbar from "../Snackbar/SnackBar";
import InvestingKnowledgeModal from "../../components/Modal/InvestingKnowledgeExamModal"

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

const StyledFormControlLabel = styled(FormControlLabel)(({ checked }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "2px solid",
  borderColor: checked ? colors.themeGreen : "#E9EBEF",
  // backgroundColor: checked ? "#ECFAEC" : "#FFFFFF",
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

const CustomFormControlLabel = (props) => (
  <StyledFormControlLabel
    {...props}
    control={<Radio checked={props.checked} />}
    label={
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <StyledLabelTypography>{props.label}</StyledLabelTypography>
        {/* {props.checked && <DoneIcon sx={{ color: "#43CB43" }} />} */}
      </Box>
    }
    checked={props.checked}
  />
);

const InvestingExam = ({testQuestions}) => {
  const [value, setValue] = useState("");

  const [answers, setAnswers] = useState([]);
 const  {isAuth }= useSelector((store) => store.auth);
  const [submitExamModal, setSubmitExamModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (questionId, optionId) => {
   
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((ans) =>
        ans.question_id === questionId
          ? { ...ans, selected_option: optionId }
          : ans
      );

      const questionExists = updatedAnswers.some(
        (ans) => ans.question_id === questionId
      );

      return questionExists
        ? updatedAnswers
        : [
            ...updatedAnswers,
            { question_id: questionId, selected_option: optionId },
          ];
    });
  };
 

  const handleSubmit = () => {
   
    const finalAnswers = testQuestions?.map((q) => ({
      question_id: q._id,
      selected_option:
        answers.find((ans) => ans.question_id === q._id)
          ?.selected_option || null,
    }));

    const unansweredQuestions = finalAnswers.some(
      (ans) => ans.selected_option === null
    );

    const payload = {
      attempted_questions: finalAnswers,
    };
 if(isAuth)
 {
  dispatch(submitInvestingExamApi(payload));
 }
   
  };

   useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
        setSubmitExamModal(true);
        return "";
      };
  
      const handleBackButton = () => {
        setSubmitExamModal(true);
        window.history.pushState(null, "", window.location.href);
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handleBackButton);
      window.history.pushState(null, "", window.location.href);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handleBackButton);
      };
    }, []);

  return (
    <>
    <InvestingKnowledgeModal submitExamModal={submitExamModal} setSubmitExamModal={setSubmitExamModal}/>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          paddingTop="48px"
          width="100%"
          flexDirection="column"
          alignItems="center"
          marginX={3}
        >
          <CustomSnackbar/>
          {/* <Grid
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
                background: "linear-gradient(45deg, #0C4340 0%, #06A77D 100%)",

                width: "fit-content",
              }}
            >
              <TimerIcon sx={{ color: "white" }} />
              <StyledTypography1 color="white" fontWeight={600}>
                {formatTime(time)}
              </StyledTypography1>
            </Box>
          </Grid> */}
          <Grid item marginTop={1} width={{ xs: "100%", md: "868px" }}>
            {testQuestions?.map((element, index) => {
              return (
                <Box marginTop={6} key={element._id}>
                  <StyledTypography2 color="#1C1C1C">
                    {` ${index + 1}. ${element?.question_text[0]?.data?.text}`}
                  </StyledTypography2>
                  <StyledFormControl component="fieldset">
                    <RadioGroup
                      value={
                        answers.find(
                          (ans) => ans.question_id === element._id
                        )?.selected_option || ""
                      }
                      onChange={(event) =>
                        handleChange(element._id, event.target.value)
                      }
                    >
                      {element.options?.map((option) => (
                        <CustomFormControlLabel
                          key={option._id}
                          value={option._id}
                          label={option.text}
                          checked={
                            answers.find(
                              (ans) => ans.question_id === element._id
                            )?.selected_option === option._id
                          }
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
              onClick={handleSubmit}
            >
           Submit
            </StyledButton2>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvestingExam;
