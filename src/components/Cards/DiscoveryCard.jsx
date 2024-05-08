import { Card,CardMedia,CardActionArea,CardContent,Typography,CardActions,Button } from '@mui/material'
import React from 'react'

const DiscoveryCard = () => {
  return (

 


    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      alt="green iguana"
      height="140"
      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjf_uMqsXPZSPxPeNhYCeWu72rw2W6R741Ax5kV_6GkA&s"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      Preferential Issuance
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  

  )
}

export default DiscoveryCard
