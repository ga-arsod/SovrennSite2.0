import React, { useState } from 'react';
import { Grid, Typography, Button, Box, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from "@emotion/styled";
import { colors } from '../Constants/colors';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useSelector } from 'react-redux';
import { validateWatchlist } from '@/app/Redux/Slices/selfHelpSlice';
import { useDispatch } from 'react-redux';
import { addToWatchlistApi } from '@/app/Redux/Slices/discoverySlice';
import { setSnackStatus } from '@/app/Redux/Slices/snackbarSlice';

// Custom Tooltip
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: 'white',
    color: colors.navyBlue500,
    fontSize: '14px',
    borderRadius: '4px',
    padding: '16px 12px',
    maxWidth: 'none',
  },
  [`& .MuiTooltip-arrow`]: {
    color: 'white',
  },
}));

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
  
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.02em;
  color: ${colors.green900};
`;


const StyledButton = styled(Button)(({ toggled }) => ({
  color: toggled ? 'red' : 'white',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '21px',
  textTransform: 'none',
  padding: '14px 0',
  width: '100%',
  border: `2px solid ${toggled ? 'red' : colors.themeGreen}`,
  backgroundColor: toggled ? 'white' : colors.themeGreen,
  '&:hover': {
    color: toggled ? 'red' : 'white',
    backgroundColor: toggled ? 'white' : colors.themeButtonHover,
    border: `1px solid ${toggled ? 'red' : colors.themeButtonHover}`,
  },
}));

const ExpectedResult = (company_id) => {
  const dispatch=useDispatch();
  const [toggled, setToggled] = useState(false);
  const {selfHelpCalculatedData,uptrend_potential,expected_price_after_1year} = useSelector(
    (store) => store.selfHelp
  );

  const handleChange = () => {
    if (!company_id.company_id) {
     
      dispatch(
        setSnackStatus({
          status: true,
          severity: "error",
          message: "Please select the company.",
        })
      );
      return;
  };

  if (!uptrend_potential || !expected_price_after_1year) {
    dispatch(
      setSnackStatus({
        status: true,
        severity: "error",
        message: "Uptrend Potential and Expected Price should not be 0.",
      })
    );
    
      return;
  };
  dispatch(addToWatchlistApi({company_id:company_id.company_id,uptrend_potential:uptrend_potential,expected_price_after_1year:expected_price_after_1year}))
  };
console.log(selfHelpCalculatedData,"calculated data")
  return (
    <Grid container justifyContent="center" sx={{ overflowX: 'hidden' }}>
      <Box
        sx={{
          backgroundColor: colors.neutral400,
          paddingY: 1.5,
          paddingX: { xs: 2, sm: 12 },
          borderRadius: 2,
          width: '100%', 
          maxWidth: { xs: '100%', sm: 'auto', md: '900px' }, 
          overflow: 'hidden', 
          boxSizing: 'border-box' 
        }}
      >
        <StyledTypography1 textAlign="center">
          Expected Result
        </StyledTypography1>

        <Grid container spacing={1.5} marginTop={6} direction={{xs:'column',sm:'row'}}>
          {selfHelpCalculatedData.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={8} sx={{ overflow: 'hidden' }}>
                <StyledTypography2>
                  {`${item.heading}:`}
                  <CustomTooltip
                    title={item.formula}
                    placement="right"
                    arrow
                  >
                    <IconButton
                      sx={{
                        marginLeft: 0.5,
                        padding: 0,
                        verticalAlign: 'middle',
                      }}
                    >
                      <InfoOutlinedIcon
                        fontSize="small"
                        sx={{
                          color: '#A5B9C9',
                        }}
                      />
                    </IconButton>
                  </CustomTooltip>
                </StyledTypography2>
              </Grid>
              <Grid item xs={4} textAlign={{xs:"left",sm:"right"}} sx={{ overflow: 'hidden' }}>
                <StyledTypography3>
               <span>{item.currency}</span><span>{item.value ? item.value : 0}</span>{item.amount_in}
                </StyledTypography3>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <StyledButton
            variant="contained"
            startIcon={<TurnedInNotIcon />}
            toggled={toggled}
            onClick={handleChange}
          >
            {'Add to Watchlist'}
          </StyledButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default ExpectedResult;