"use client";
import React, { useEffect ,useState} from "react";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import { Container, Grid, Typography, IconButton, Box } from "@mui/material";
import styled from "@emotion/styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import ScrollCircle from "../../../components/Common/ScrollCircle";
import { colors } from "@/components/Constants/colors";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "@/components/Common/Spinner";
import Head from "next/head";
import { getParentsBucketApi } from "../../Redux/Slices/discoverySlice";
import Pagination from "../../../components/Pagination/Pagination";

const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    flex: 1 1 100%;
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.black};
`;

const StyledTypography2 = styled(Typography)`
  font-size: 14px;
  line-height: 17px;
`;

const StyledGrid = styled(Box)`
  cursor: pointer;
  background-color: #faf9f9;

  border: 1px solid #e6e8e9;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background-color 0.8s;

  &:hover {
    background-color: ${colors.green50};

    .arrow-icon {
      transform: rotate(-45deg);
      color: white;
      font-size: 14px;
    }

    .icon-button {
      background-color: ${colors.themeGreen};
      border-color: ${colors.navyBlue900};
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    margin-top: auto;
  }
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b0b7bc;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.5s, border-color 0.5s, transform 0.5s;

  .arrow-icon {
    transition: transform 0.8s;
  }
`;

const DefaultImageContainer = styled(Box)`
  background-color: ${colors.green900};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  border-radius: 3px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

const Discovery = () => {
  const { title } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { isParentsBucketLoading, parentsBucket ,pagination} = useSelector(
    (store) => store.discovery

  );
 
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getParentsBucketApi({ title,currentPage }));
  }, [dispatch, title,currentPage]);

  useEffect(() => {
    if (isParentsBucketLoading) {
      document.title = "Loading Stock Discovery...";

      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          "Loading stock discovery data. Please wait while we fetch the latest insights."
        );
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", "Loading Stock Discovery...");
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute(
          "content",
          "Stock Discovery data is being loaded. Please check back in a moment."
        );
    } else {
      document.title =
        "Investors are Going Crazy Over this Groundbreaking Stock Discovery";

      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          "Stock Discovery! Investors can't get enough of this groundbreaking opportunity. Find out why everyone is going crazy over it today!"
        );
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute(
          "content",
          "Investors are Going Crazy Over this Groundbreaking Stock Discovery"
        );
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute(
          "content",
          "Stock Discovery! Investors can't get enough of this groundbreaking opportunity. Find out why everyone is going crazy over it today."
        );
    }
    if (typeof window !== "undefined") {
      document.title = title;
      const link = document.querySelector("link[rel='canonical']");
      if (link) {
        link.href = `https://www.sovrenn.com/discovery`;
      }
    }
  }, [isParentsBucketLoading]);

  const handleNavigation = (item) => {
    router.push(`/nested/${title}/${item?.slug}`);
  };

  const headingObject = {
    heading: parentsBucket?.bucket?.bucket_name,
    description: parentsBucket?.bucket?.about,
  };

  if (isParentsBucketLoading) {
    return (
      <>
       
        <Container>
          <DiscoveryHeading />
          <Spinner margin={2} />
        </Container>
      </>
    );
  }

  return (
    <>
    
      <Container>
        <DiscoveryHeading headingObject={headingObject} />
        <Box marginBottom={6}>
          <GridContainer>
            {parentsBucket?.child_buckets?.map((item, index) => (
              <StyledGrid key={index} onClick={() => handleNavigation(item)}>
             
                <Box className="content">
                  <Grid container>
                    <Grid item paddingY={2} paddingX="20px" width="100%">
                      <Box sx={{ borderRadius: "3px", overflow: "hidden" }}>
                        {item?.thumb_url ? (
                          <Image
                            src={item?.thumb_url}
                            width={274}
                            height={140}
                            alt="poster"
                            layout="responsive"
                          />
                        ) : (
                          <DefaultImageContainer>
                            <Typography variant="h6">
                              {item?.bucket_name}
                            </Typography>
                          </DefaultImageContainer>
                        )}
                      </Box>
                    </Grid>
                    <Grid item paddingX="20px">
                      <StyledTypography1 gutterBottom>
                        {item?.bucket_name}
                      </StyledTypography1>
                      <StyledTypography2
                        color={colors.navyBlue400}
                        sx={{ fontWeight: 500 }}
                        marginBottom={1}
                      >
                        {item?.about}
                      </StyledTypography2>
                    </Grid>
                  </Grid>
                  <Box className="bottom-section">
                    <StyledTypography2
                      component="span"
                      color={colors.themeGreen}
                      sx={{ fontWeight: 600 }}
                    >
                      {`${item?.
total_companies} companies are in this bucket`}
                    </StyledTypography2>
                    <CustomIconButton className="icon-button">
                      <ArrowForwardIcon
                        fontSize="small"
                        className="arrow-icon"
                        sx={{ color: "#3C464F" }}
                      />
                    </CustomIconButton>
                  </Box>
                </Box>
              </StyledGrid>
            ))}
          </GridContainer>
          <ScrollCircle />
        </Box>
        <ScrollCircle />
        {parentsBucket?.child_buckets?.length ? (
          <Box mt={2}>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagination={pagination}
            />
          </Box>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Discovery;
