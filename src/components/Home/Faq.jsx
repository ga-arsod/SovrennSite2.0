"use client"
import React,{useState} from "react";
import { Box ,Grid,Typography, Accordion, AccordionSummary, AccordionDetails,} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';



const StyledTypography1 = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
@media (max-width:700px)
{
  font-weight:600;
font-size:23px;
line-height:28px;
}

`;

const StyledTypography2 = styled(Typography)`
font-weight:400;
font-size:20px;
line-height:24px;
@media (max-width:700px)
{
  font-weight:400;
font-size:12px;
line-height:14px;
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
  }
`;
const StyledAccordionDetails = styled(AccordionDetails)`
  && {
    padding: 0;
  }
`;
const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #96A7B4; 
  margin: 8px 0; 
  width: 100%;
  display: inline-block
`;
const faqs = [
  { question: 'What will I get in the 2 months trial plan?', answer: 'Lorem Ipsum, sometimes referred to as lipsum", is the placeholder text used in design when creating content.' },
  { question: 'What will I get in the 2 months trial plan?', answer: 'Lorem Ipsum, sometimes referred to as "lipsum", is the placeholder text used in design when creating content.' },
  { question: 'What will I get in the 2 months trial plan?', answer: 'Lorem Ipsum, sometimes referred to as "lipsum", is the placeholder text used in design when creating content.' },
  
];
const Faq=()=>{
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  return(
    
<Box width="100%" sx={{backgroundImage: `url('/rectangle.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
      <Grid container spacing={1} direction="column" justifyContent='center' alignItems='center' paddingTop={4}>
        <Grid item> 
        <Typography textAlign='center'>
        <StyledTypography1 component="span" color="#0D1726" marginRight={1} >Frequently asked</StyledTypography1>
       <StyledTypography1 component="span" color="#1DA098" >questions</StyledTypography1>

        </Typography>
      
        </Grid>
        
        <Grid item> 
       <StyledTypography2 component="div" textAlign='center' color="#627B8F"  sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>Everything you need to know about the product and billing.</StyledTypography2>
        </Grid>
       <Grid item>
       <Grid container  marginTop={6} justifyContent='center' >
     <Grid item paddingX={{xs:4}}>
     {faqs.map((faq, index) => (
      <>
        <StyledAccordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:'#1DA098'}} />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography color='#0D1726' sx={{fontWeight:'600',fontSize:'20px',lineHeight:"24px"}}> {faq.question}</Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography color="#627B8F" sx={{ fontSize:"16px",fontWeight:"400px",lineHeight:"24px"}}>{faq.answer}</Typography>
          </StyledAccordionDetails>
         
        </StyledAccordion>
        <HorizontalLine />
        
         </>
      ))}

     </Grid>
     </Grid>
       </Grid>
       

      </Grid>
    

      </Box>
  )
}

export default Faq;