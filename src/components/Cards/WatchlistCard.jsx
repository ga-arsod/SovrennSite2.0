"use client";
import React,{useState,useEffect} from "react";
import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useDispatch } from "react-redux";
import DeleteModal from "../Modal/DeleteModal";
import moment from 'moment';
import { removeFromWatchlistApi } from "@/app/Redux/Slices/discoverySlice";
import { toggleEditModal } from "@/app/Redux/Slices/watchlistSlice";

const StyledTypography1 = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
  letter-spacing: -0.02em;
`;
const StyledTypography3 = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const StyledEditIcon = styled(ModeEditOutlineOutlinedIcon)`
  && {
    font-size: 16px; // Decrease the icon size
    color: ${colors.navyBlue500};
  }
`;

const StyledButton1 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 10px;
  text-transform: none;
  border-color: ${colors.greyBlue500};
  &:hover {
    color: ${colors.navyBlue500};
    border-color: ${colors.greyBlue500};
  }
`;
const StyledButton2 = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color:white;
  padding: 8px 4px;
  text-transform: none;
  background-color:${colors.red300};
  border-color:${colors.red300};
  &:hover {
    background-color:${colors.red300};
  border-color:${colors.red300}
    color: white;
   
  }
`;
const WatchlistCard = ({data,setCompanyData}) => {
  const dispatch=useDispatch()
  const [open,setOpen]=useState(false)
  const [selectedItemObject, setSelectedItemObject] = useState({
    id: null,
    title: "",
  });
  const handleDeleteClick = (event,id, title) => {
    event.stopPropagation(); 
    setSelectedItemObject({
      ...selectedItemObject,
      id: id,
      title: title,
    });
    setOpen(true);
  };
  return (
    <>
     <DeleteModal
          open={open}
          setOpen={setOpen}
          selectedItemObject={selectedItemObject}
          api={removeFromWatchlistApi}
        />
         <Box sx={{ flexGrow: 1 }} marginTop={5}>
      <Grid
        container
        marginBottom={{xs:3,sm:5}}
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
        {data.map((ele, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#EFF2F4",
              borderRadius: "4px",
              maxWidth: "474px",
              width: "100%",
              padding: 2,
              boxSizing: "border-box",
              margin: "auto",
            }}
          >
            <StyledTypography1
              color={colors.greyBlue900}
              sx={{ fontWeight: "400" }}
              component="span"
            >
              {`Added on : `}
            </StyledTypography1>
            <StyledTypography1
              color={colors.navyBlue500}
              sx={{ fontWeight: "600" }}
              component="span"
            >
             {moment(ele.createdAt).format("Do MMM YY")}
            </StyledTypography1>
            <StyledTypography2 marginTop={1} color="#1F3356" component="div">
            {ele.company_Id.company_name}
            </StyledTypography2>
            <Box marginTop={1}>
              
              <Grid container justifyContent="space-between" marginTop={1}>
              <Grid item>
                  <StyledTypography3
                    color={colors.greyBlue900}
                    sx={{ fontWeight: "400" }}
                    component="span"
                  >
                    {`Uptrend Potential : `}
                  </StyledTypography3>
                  <StyledTypography3
                    color={colors.navyBlue500}
                    sx={{ fontWeight: "600" }}
                    component="span"
                  >
                 {`${ele.uptrend_potential}%`}
                  </StyledTypography3>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <StyledTypography3
                    color={colors.greyBlue900}
                    sx={{ fontWeight: "400" }}
                    component="span"
                  >
                    Expected Price :
                  </StyledTypography3>
                  <StyledTypography3
                    color={colors.navyBlue500}
                    sx={{ fontWeight: "600" }}
                    component="span"
                  >
                 {`₹${ele.expected_price_after_1year}`}
                  </StyledTypography3>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ paddingBottom: "8px", borderColor: "#E6E6E6" }} />

            <Grid
              container
              justifyContent="flex-end"
              gap={1}
              marginBottom={0.5}
              marginTop={1}
            >
              <StyledButton1
                variant="outlined"
                startIcon={<StyledEditIcon />}
                size="small"
                onClick={()=>{
                  dispatch(toggleEditModal())
                  setCompanyData(ele)
                }}
              >
                Edit
              </StyledButton1>
              <StyledButton2 variant="contained" size="small"
              onClick={(e)=>{
                setOpen(true);
                handleDeleteClick(e,ele.company_Id._id,ele.company_Id.company_name)

              }}
              >
                Delete
              </StyledButton2>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
    </>
   
  );
};

export default WatchlistCard;
