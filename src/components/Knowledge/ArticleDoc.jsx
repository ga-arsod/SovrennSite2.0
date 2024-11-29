"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/knowledgeArticle.module.css";
import Link from "next/link";


const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ArticleDoc = ({ content, data }) => {
  if (!data) {
    return (
      <div id={styles.notLoggedinDiv}>
        <h4>Ooops, Encountered an error please check back after some time.</h4>
      </div>
    );
  }

  return (
    <article style={{ userSelect: "text" }} id={styles.MainContainer}>
      <h1>{data.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: content }} />

     
    </article>
  );
};

export default ArticleDoc;
