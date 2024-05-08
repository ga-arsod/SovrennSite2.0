import { Grid ,Box,Avatar,Typography,Stack} from '@mui/material';
import React from 'react'

import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';


const StyledGrid=styled(Grid)`
@media (min-width: 640px) and (max-width: 1024px) {
 height:40vh
}
height:100vh
`;
const infoObj = {
    h1: "Start your investing journey.",
    h2: "Create a free account and get access to all free features of Sovrenn to equip yourself with financial Knowledge.",
    h3: "Get started in 2 minutes.",
    users: "20,000+",
  };



const SignUpCard = () => {
    const theme=useTheme();
  return (
    <StyledGrid
            container
            height="100%"
            sx={{
              background: "linear-gradient(to right, #0C4340, #4AB3AD)",
              display: "flex",
              alignItems: "center",
           
            }}
          >
            <Grid
              item
              paddingX={7}
              paddingY="3rem"
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Box display="flex" justifyContent={{xs:"center",lg:"flex-start"}}>
              <Avatar alt="star" src="/stars.svg" />
              </Box>
             
             

            
             

              <Typography
                color="#E4E7EC"
                textAlign={{xs:"center",lg:"start"}}
                sx={{ fontWeight: "600", fontSize: "50px", lineHeight: "52px" }}
              >
                {infoObj.h1}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                textAlign={{xs:"center",lg:"start"}}
                color="#E4E7EC"
                sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px" }}
              >
                {infoObj.h2}
              </Typography>
              <Typography
                variant="body1"
                color="#E4E7EC"
                textAlign={{xs:"center",lg:"start"}}
                sx={{ fontWeight: "600", fontSize: "19px", lineHeight: "23px" }}
              >
                {infoObj.h3}
              </Typography>
             
              <Grid container sx={{ position: 'relative',display:"flex",justifyContent:{xs:"center",lg:"flex-start"}, alignItems: 'center', height: '56px' }}>
      <Grid item  >
        <Stack direction="row" sx={{ position: 'relative' }}>
          <Avatar
            alt="Avatar 1"
            src="/aditya.png"
            sx={{ width: 40, height: 40, zIndex: 1 }}
          />
          <Avatar
            alt="Avatar 2"
            src="/akriti.png"
            sx={{ width: 40, height: 40, position: 'absolute', left: 20, zIndex: 2 }}
          />
          <Avatar
            alt="Avatar 3"
            src="/akriti.png"
            sx={{ width: 40, height: 40, position: 'absolute', left: 40, zIndex: 2 }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ pl: 6.5 }}>
        <Typography
          color="#E4E7EC"
          sx={{
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '17px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
              lineHeight: '15px',
            },
          }}
        >
          {`Join ${infoObj.users} users`}
        </Typography>
      </Grid>
    </Grid>
            </Grid>
          </StyledGrid> 
  )
}

export default SignUpCard
