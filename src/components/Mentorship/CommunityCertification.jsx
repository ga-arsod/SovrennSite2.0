'use client';

import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';
import SvgIcon from '@mui/material/SvgIcon';

const WhatsAppFilledIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="#FFFFFF"
      d="M12.04 2.01c-5.52 0-9.98 4.47-9.98 9.98 0 1.76.46 3.48 1.34 5.01L2 22l5.14-1.35a10.05 10.05 0 004.9 1.25h.01c5.52 0 9.98-4.47 9.98-9.98 0-2.67-1.04-5.17-2.93-7.07A9.92 9.92 0 0012.04 2zm5.76 14.63c-.24.67-1.41 1.32-1.94 1.41-.5.09-1.13.13-1.82-.12-.42-.14-.96-.31-1.65-.61-2.92-1.27-4.84-4.22-4.99-4.42s-1.2-1.6-1.2-3.05c0-1.45.76-2.16 1.04-2.46.27-.29.58-.36.77-.36h.59c.19 0 .44-.03.67.5.24.58.81 2 .88 2.14.07.14.12.31.02.49-.09.18-.13.3-.26.46-.12.15-.27.33-.39.44-.13.14-.26.29-.11.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.24 2.22 1.38.28.13.45.11.63-.07.17-.18.73-.85.93-1.15.19-.3.39-.25.67-.14.27.1 1.7.8 2 .94.29.14.48.21.55.33.06.13.06.76-.18 1.43z"
    />
  </SvgIcon>
);

const StyledTypography1 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  line-height: 19px;
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeGreen};
  }
`;

export default function CommunityCertificateSection({ certificate, whatsapp }) {
  const handleOpenCertificate = () => {
    if (certificate?.certificate_url) {
      const url = certificate?.certificate_url;

      const newTab = window.open(url, '_blank', 'noopener,noreferrer');

      if (!newTab) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = 'Certificate.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <Box mt={2.5}>
      <Grid container spacing={2} alignItems="stretch">
        {/* WhatsApp Section */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Card
            sx={{
              border: '1px solid #DEDDDD',
              borderRadius: '16px',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'none',
              flexGrow: 1,
            }}
          >
            <StyledTypography1 color={colors.neutral900} mb={2}>
              {whatsapp?.header}
            </StyledTypography1>

            <Box
              component="img"
              src="/mentorship-dashboard1.png"
              alt="Community"
              sx={{ width: '100%', height: 245, objectFit: 'contain', my: 2 }}
            />

            <StyledTypography2
              color={colors.neutral900}
              sx={{ fontWeight: '600' }}
              mb={1}
              textAlign="center"
            >
              {whatsapp?.title}
            </StyledTypography2>

            <StyledTypography2 color="#9E9E9E" mb={2} textAlign="center">
              {whatsapp?.description}
            </StyledTypography2>

            <StyledButton1
              startIcon={<WhatsAppFilledIcon />}
              onClick={() => {
                const whatsappLink = whatsapp?.whatsapp_group_link;
                window.open(whatsappLink, '_blank', 'noopener,noreferrer');
              }}
            >
              Join Now
            </StyledButton1>
          </Card>
        </Grid>

        {/* Certificate Section */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Card
            sx={{
              border: '1px solid #DEDDDD',
              borderRadius: '16px',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'none',
              flexGrow: 1,
            }}
          >
            <StyledTypography1 color={colors.neutral900} mb={2}>
              My Certificate
            </StyledTypography1>

            <Box
              component="img"
              src="/mentorship-dashboard2.png"
              alt="Certificate"
              sx={{ width: '100%', height: 209, objectFit: 'contain', mb: 2 }}
            />

            <StyledTypography2 color={colors.neutral900} sx={{ fontWeight: '600' }}>
              Certificate will be available to download after 48 hours of the final session.
            </StyledTypography2>

            <Divider sx={{ my: 2.5, borderColor: colors.neutral600 }} />

            <StyledTypography2 color={colors.neutral900} mb={2}>
              <strong>Note:</strong> Name on the certificate will be same as your Sovrenn username.
            </StyledTypography2>

            <StyledButton1
              variant="outlined"
              onClick={handleOpenCertificate}
              startIcon={<DownloadIcon />}
              disabled={!certificate?.is_certificate_issued}
            >
              Download Now
            </StyledButton1>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
