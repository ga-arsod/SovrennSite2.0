"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import { usePathname } from "next/navigation";
import { educationFaqArray, faqDescription } from "@/utils/Data";
import { Fade } from "@mui/material";


const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

const StyledAccordion = styled(Accordion)`
  border: none;
  box-shadow: none;
  background-color: transparent;
  margin: 0;
  padding: 0;

  &.MuiAccordion-root:before {
    display: none;
  }
`;
const StyledAccordionSummary = styled(AccordionSummary)`
 && {
    padding: 0;
    .MuiAccordionSummary-content {
      margin-right: 24px;
      align-items: flex-start; 
    }
    .MuiAccordionSummary-expandIconWrapper {
      align-self: flex-start; 
      margin-top: 12px;
    }
  }
`;
const StyledAccordionDetails = styled(AccordionDetails)`
  && {
    padding: 0;
  }
`;
const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #e4e7ec;
  margin: 8px 0;
  width: 100%;
  display: inline-block;
`;
const FadeInBox = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));


const Faq = ({data}) => {
 
  
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(null);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <Box
      width="100%"
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        paddingX={2}
        spacing={1}
       
        direction="column"
        justifyContent="center"
        alignItems="center"
        paddingY={{xs:"20px",sm:pathname==="/"?"48px":"20px",md:"48px"}}
      >
        <Grid item>
          <FadeInBox ref={domRef} className={isVisible ? "visible" : ""}>
            <Typography textAlign="center" marginBottom="20px">
              <StyledTypography1
                component="span"
                color={colors.navyBlue900}
                marginRight={1}
              >
                Frequently asked
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                questions
              </StyledTypography1>
            </Typography>
            <StyledTypography2
              component="div"
              textAlign="center"
              color={colors.greyBlue500}
              sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px" }}
            >
              {pathname === "/"
                ? faqDescription.home
                :""}
            </StyledTypography2>
          </FadeInBox>
        </Grid>

        <Grid item paddingBottom={4}  width={{xs:"100%",md:"900px"}}>
          <Fade in={inView} timeout={1000}>
            <Grid
              container
              marginTop={6}
              justifyContent="center"
              ref={ref}
              sx={{ opacity: inView ? 1 : 0 }}
            >
              <Grid item paddingX={{ xs: 2 }}>
                {data?.map(
                  (faq, index) => (
                    <>
                      <StyledAccordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                      >
                        <StyledAccordionSummary
                          expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.themeGreen }} />
                          }
                          aria-controls={`panel${index}bh-content`}
                          id={`panel${index}bh-header`}
                        >
                          <Typography
                            color={colors.greyBlue900}
                            sx={{
                              fontWeight: "600",
                              fontSize: "20px",
                              lineHeight: "24px",
                            }}
                          >
                            {" "}
                            {faq.que}
                          </Typography>
                        </StyledAccordionSummary>
                        <StyledAccordionDetails>
                          <Typography
                            color="#627B8F"
                            sx={{
                              fontSize: "16px",
                              fontWeight: "400px",
                              lineHeight: "24px",
                            }}
                          >
                            {faq.ans}
                          </Typography>
                        </StyledAccordionDetails>
                      </StyledAccordion>
                      {index !==
                        (data.length) -
                          1 && <HorizontalLine />}
                    </>
                  )
                )}
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Faq;
