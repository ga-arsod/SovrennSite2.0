
import React from 'react'
import { Box,Grid } from '@mui/material'
import Image from 'next/image'

const DiscoveryCard = () => {
  return (

 <>
 <Box>
  <Grid container>
    <Grid item xs={3} height="25vh">
     <Grid container padding={2} bgcolor="#E9EBEF" >
      <Grid item>
      <Image
          width={292}
          height={140}
            alt="discovery-picture"
            src="/carousel.webp"
          
          />
      </Grid>
     </Grid>
    </Grid>

  </Grid>

 </Box>


 </>


 
  

  )
}

export default DiscoveryCard
