"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import styled from "@emotion/styled";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { colors } from "../Constants/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Spinner from "../../components/Common/Spinner";



const StyledTypographyDate = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  font-weight: 14px;
  color: ${colors.greyBlue500};
`;

const StyledTypographyTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  margin: 8px 0;
`;

const StyledTypographyCategory = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
  color: ${colors.green900};
  font-weight: 600;
  padding: 4px 8px;
  background-color: ${colors.green50};
  border-radius: 4px;
  display: inline-block;
`;

const StyledIconButton = styled(IconButton)`
  border: 1px solid ${colors.grey500};
  border-radius: 50%;
  padding: 5px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;
const StyledButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-transform: none;
  color: ${colors.navyBlue500};
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
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s;
  /* Add transition for all properties */

  .arrow-icon {
    color: #3c464f;
    font-size: 16px;
  }
`;

const StyledCard = styled(Box)`
  max-width: 678px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 639px) {
    height: 160px;
  }

  &:hover {
    transform: scale(1.04);

    .custom-icon-button {
      background-color: ${colors.themeGreen};
      border-color: ${colors.navyBlue900};
      transform: rotate(-45deg);

      .arrow-icon {
        color: ${colors.white};
        font-size: 14px;
      }
    }
  }
`;

const KnowledgeCard = ({ initialPosts, categories, initialPagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("category");

  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);

  const getPostsByCategory = async (page = 1) => {
    if (pagination.page == 1) setIsLoading(true);

    const url =
      slug === null
        ? `https://cms.sovrenn.com/api/posts?sort=createdAt:desc&filters[category][slug][$ne]=chronicles&pagination[pageSize]=20&pagination[page]=${page}&populate=category`
        : `https://cms.sovrenn.com/api/posts?filters[category][slug][$eq]=${slug}&sort=publishedAt:desc&pagination[pageSize]=20&pagination[page]=${page}&populate=category`;
    const res = await fetch(url);

    const data = await res.json();

    if (res.ok) {
      setPosts(data.data);
      setPagination(data.meta.pagination);
      setIsLoading(false);
    }
    return data;
  };

  const loadMorePosts = async () => {
    if (pagination.page >= pagination.pageCount) return;

    const nextPage = pagination.page + 1;

    try {
      const data = await getPostsByCategory(nextPage);

      setPosts([...posts, ...data.data]);
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: nextPage,
      }));
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
    }
  };
  const [likedCards, setLikedCards] = useState(Array(12).fill(false));

  const handleLikeToggle = (index) => {
    setLikedCards((prevLikedCards) =>
      prevLikedCards.map((liked, i) => (i === index ? !liked : liked))
    );
  };
  useEffect(() => {
   
      setPosts([]);
      setPagination(initialPagination);
      getPostsByCategory(1);
    
  }, [slug]);

  if (isLoading) {
    return <Spinner margin={2} />;
  }
  console.log(posts.length);
  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }} marginTop={1}>
          <Grid
            container
            marginBottom={5}
            justifyContent="center"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
              padding: { xs: 1 },
            }}
          >
            {posts?.map((ele, index) => (
              <Link
                target="_blank"
                href={`/knowledge/${ele.attributes.slug}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <StyledCard>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <StyledTypographyDate>
                      {moment(ele.attributes.publishedAt).format("MMM Do YY")}
                    </StyledTypographyDate>
                    {/* <StyledIconButton onClick={() => handleLikeToggle(index)}>
                  {likedCards[index] ? (
                    <FavoriteIcon style={{ color: colors.red500, fontSize: "14px" }} />
                  ) : (
                    <FavoriteBorderIcon style={{ fontSize: "14px" }} />
                  )}
                </StyledIconButton> */}
                  </Grid>
                  <StyledTypographyTitle color="#101828">
                    {ele.attributes.title}
                  </StyledTypographyTitle>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <StyledTypographyCategory>
                        {ele?.attributes?.category?.data?.attributes?.name}
                      </StyledTypographyCategory>
                    </Grid>
                    <Grid item sx={{ display: "flex", alignItems: "center" }}>
                      <StyledButton size="small" variant="text" color="primary">
                        Read More
                      </StyledButton>
                      <CustomIconButton className="custom-icon-button">
                        <ArrowForwardIcon
                          fontSize="small"
                          className="arrow-icon"
                          sx={{ fontSize: "16px" }}
                        />
                      </CustomIconButton>
                    </Grid>
                  </Grid>
                </StyledCard>
              </Link>
            ))}
          </Grid>
        </Box>
        {pagination.page < pagination.pageCount && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              marginBottom={6}
            >
              <StyledButton2 variant="contained" onClick={loadMorePosts}>
                {isLoading ? "Loading..." : "Load More"}
              </StyledButton2>
            </Box>
          </div>
        )}
      </Container>
     
    </>
  );
};

export default KnowledgeCard;
