"use client";

import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Link,
  Grid,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WifiIcon from "@mui/icons-material/Wifi";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import ApplyButton from "../Mentorship/ApplyButton";
import Image from "next/image";

const StyledTypography1 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
 
`;
const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.02em;
`;

const StyledLink = styled(Link)`
  color: ${colors.themeGreen};
  text-decoration: underline;
  text-decoration-color: ${colors.themeGreen};
  text-underline-offset: 2px;
`;

export default function Program({data}) {
    
  return (
    <>
      <Container>
        <Box
          sx={{
            border: `1px solid ${colors.themeGreen}`,
            backgroundColor: "#E6F6F2",
            borderRadius: 2,
            maxWidth: 900,
            mx: "auto",
            mt: 6,
            py: 1.5,
            px: 2,
          }}
        >
          <Grid container justifyContent="center">
            <Grid item width={{ xs: "100%", sm: "60%" }}>
              <StyledTypography1
                align="center"
                color={colors.navyBlue900}
                mb={3}
              >
               {data?.header}
              </StyledTypography1>

              <Stack
                spacing={2}
                divider={<Divider sx={{ borderColor: "#DEDDDD" }} />}
              >
                {data?.details?.map((item, index) => (
                 <Stack key={index} direction="row" spacing={2} alignItems="center">
                 <Box width={40} height={24} position="relative">
                   <Image
                     src={item.prefix_icon_url}
                     alt={`why-join-program-image(${index+1})`}
                     fill
                     style={{ objectFit: 'contain' }}
                   />
                 </Box>
                 <StyledTypography1 color={colors.neutral900}>
                  {item?.text}
                 </StyledTypography1>
               </Stack>
               
                ))}
              </Stack>

              <Box textAlign="center">
                <ApplyButton />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <StyledTypography2
          color={colors.grey400}
          textAlign="center"
          mt={2}
          mb={5}
          px={6}
        >
          *Please read{" "}
          <StyledLink
            href="/mentorship/terms-and-conditions"
            color={colors.themeGreen}
          >
            Terms & Conditions
          </StyledLink>{" "}
          before applying
        </StyledTypography2>
      </Container>
    </>
  );
}
