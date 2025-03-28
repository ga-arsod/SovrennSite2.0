import React from 'react';
import { Snackbar, Alert, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackStatus } from '@/app/Redux/Slices/snackbarSlice';


const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

const CustomSnackbar = ({ isCommentsModalOpen }) => {
  const dispatch = useDispatch();
  const { status, severity, message } = useSelector((store) => store.snackbar);

  return (
    <Snackbar
      open={status}
      onClose={() => dispatch(resetSnackStatus())}
      TransitionComponent={SlideTransition}
      anchorOrigin={{
        vertical: isCommentsModalOpen ? 'bottom' : 'top',
        horizontal: isCommentsModalOpen ? 'right' : 'right',
      }}
      style={{
        marginTop: isCommentsModalOpen ? '0px' : '60px',
        marginBottom: isCommentsModalOpen ? '20px' : '0px',
      }}
      autoHideDuration={3000}
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
