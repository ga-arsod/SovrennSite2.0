import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const BlurredArticle = ({ isLocked, onUnlock, htmlContent }) => {
  return (
    <Box position="relative" maxWidth="800px" margin="auto" padding="20px">
      {/* Dynamic Article Content from HTML */}
      <Box
        sx={{
          filter: isLocked ? 'blur(10px)' : 'none',
          transition: 'filter 0.3s ease',
          pointerEvents: isLocked ? 'none' : 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Unlock Button */}
      {isLocked && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" color="primary" onClick={onUnlock}>
            Unlock Article
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BlurredArticle;