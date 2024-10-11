import { Box, Typography ,Grid} from '@mui/material';
import styled from "@emotion/styled";


const StyledTypography1 = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
 color: #96A7B4;
 
`;
const NoData = ({text}) => {
  return (
    <Grid container sx={{ my: 4 }}>
        <Grid item width="100%">
        <Box
        sx={{
          border: '1px solid #DEDDDD', 
          borderRadius: '8px', 
          padding: '12px', 
          textAlign: 'center',
        }}
      >
        <StyledTypography1  sx={{ color: '#A0A0A0' }}>
          {text}
        </StyledTypography1>
      </Box>

            </Grid>
      
      
    </Grid>
  );
};

export default NoData;