import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { colors } from '../Constants/colors';

export default function Spinner({margin}) {
  return (
    <Box sx={{ display: 'flex',justifyContent:'center' }} marginY={margin}>
      <CircularProgress  />
    </Box>
  );
}