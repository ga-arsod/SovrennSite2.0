import React, { useState } from 'react';
import { Grid, Typography, Button, Box, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from "@emotion/styled";
import { colors } from '../Constants/colors';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

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
  white-space: nowrap;
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

const ExpectedResult = () => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  };

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
          {[
            { label: 'Expected 1 Year Forward Sales', value: '12Cr' },
            { label: 'Expected 1 Year Forward Net Profit', value: '12Cr' },
            { label: 'Expected 1 Year Forward Market Cap', value: '12Cr' },
            { label: 'Upside Potential', value: '70%' },
            { label: 'Expected Price After 1 Year', value: '12Cr' },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={9} sx={{ overflow: 'hidden' }}>
                <StyledTypography2>
                  {item.label}
                  <CustomTooltip
                    title={`This is the ${item.label.toLowerCase()}`}
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
              <Grid item xs={3} textAlign={{xs:"left",sm:"right"}} sx={{ overflow: 'hidden' }}>
                <StyledTypography3>
                  {item.value}
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
            onClick={handleToggle}
          >
            {toggled ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </StyledButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default ExpectedResult;