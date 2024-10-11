import React, { useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { colors } from '../Constants/colors';
import { timesPdfListApi } from '@/app/Redux/Slices/timesSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const StyledBox = styled(Box)({
  padding: '16px',
  backgroundColor: '#F1F5F9',
  borderRadius: '8px',
  marginBottom: '16px',
});

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const ArticleBanner = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const { timesPdfList } = useSelector((store) => store.times);

  useEffect(() => {
    dispatch(timesPdfListApi({}));
  }, []);

  const handleReadNowClick = (path, id) => {
    router.push(`/times/read-pdf?path=${path}&id=${id}`);
  };

  return (
    <>
      {timesPdfList?.map((elem, index) => (
        <StyledBox key={index}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <StyledTypography1
                color={colors.greyBlue500}
                marginRight={1}
                component="span"
              >
                {`Sovrenn Times-`}
              </StyledTypography1>
              <StyledTypography1 color="black" component="span">
                {moment(elem.date).format('Do MMMM YYYY')}
              </StyledTypography1>
            </Grid>
            <Grid item>
            {/* <Link href={`/times/read-pdf?path=${ele?.pdf_file_key}`} target="_blank"> */}
              <StyledButton1
                variant="contained"
                onClick={() => handleReadNowClick(elem?.pdf_file_key, elem?._id)}
              >
                Read Now
              </StyledButton1>
              {/* </Link> */}
            </Grid>
          </Grid>
        </StyledBox>
      ))}
    </>
  );
};

export default ArticleBanner;