import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackStatus } from '@/app/Redux/Slices/snackbarSlice';

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { status, severity, message } = useSelector((store) => store.snackbar);

  return (
    <Snackbar
      open={status}
      onClose={() => dispatch(resetSnackStatus())}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    
      style={{ marginTop: '60px' }} // Additional space from the top
      autoHideDuration={2000}
    >
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => dispatch(resetSnackStatus())}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;