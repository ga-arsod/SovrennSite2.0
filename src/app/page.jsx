"use client"
import React, { useEffect } from "react";
import MainPoster from "@/components/Home/MainPoster";
import UserCount from "@/components/Home/UserCount";
import Information from "@/components/Home/Information";
import CustomerVerdict from "@/components/Home/CustomerVerdict";
import FoundersInfo from "@/components/Home/FoundersInfo";
import Offer from "@/components/Home/Offer";
import PlanInfo from "@/components/Home/PlanInfo";
import Faq from "@/components/Home/Faq";
import AppInfo from "@/components/Home/AppInfo";
import TrialCard from "@/components/Cards/TrialCard";
import Updates from "@/components/Home/Updates";
import { auth } from "@/auth";
import SaleBanner from "../components/SaleBanner/SaleBanner";

const Home =  () => {
 

  useEffect(() => {
    const title = "Information platform to discover the best MicroCap stocks to buy in India";
    const description =
      "Sovrenn: Information platform to discover the best MicroCap stocks to buy in India. We teach investing and provide high quality and timely information to our readers which empowers them to take smart investment decisions";
    const imageUrl =
      "https://sovrenn-website-images.s3.ap-south-1.amazonaws.com/SocialMediaPreviewThumbnail.png";
    const url = "https://www.sovrenn.com";

    // Set dynamic metadata
    if (typeof document !== "undefined") {
      // Set the document title
      document.title = title;

      // Set the meta description
      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }

      // Set OG title
      let metaTitle = document.querySelector("meta[property='og:title']");
      if (metaTitle) {
        metaTitle.setAttribute("content", title);
      } else {
        metaTitle = document.createElement("meta");
        metaTitle.setAttribute("property", "og:title");
        metaTitle.setAttribute("content", title);
        document.head.appendChild(metaTitle);
      }

      // Set OG description
      let metaDescriptionOg = document.querySelector("meta[property='og:description']");
      if (metaDescriptionOg) {
        metaDescriptionOg.setAttribute("content", description);
      } else {
        metaDescriptionOg = document.createElement("meta");
        metaDescriptionOg.setAttribute("property", "og:description");
        metaDescriptionOg.setAttribute("content", description);
        document.head.appendChild(metaDescriptionOg);
      }

      // Set OG image
      let metaImage = document.querySelector("meta[property='og:image']");
      if (metaImage) {
        metaImage.setAttribute("content", imageUrl);
      } else {
        metaImage = document.createElement("meta");
        metaImage.setAttribute("property", "og:image");
        metaImage.setAttribute("content", imageUrl);
        document.head.appendChild(metaImage);
      }

      // Set OG URL
      let metaUrl = document.querySelector("meta[property='og:url']");
      if (metaUrl) {
        metaUrl.setAttribute("content", url);
      } else {
        metaUrl = document.createElement("meta");
        metaUrl.setAttribute("property", "og:url");
        metaUrl.setAttribute("content", url);
        document.head.appendChild(metaUrl);
      }

      // Set canonical link
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (canonicalLink) {
        canonicalLink.setAttribute("href", url);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", url);
        document.head.appendChild(canonicalLink);
      }
    }
  }, []);

  return (
    <>
      <SaleBanner />
      <MainPoster />
      <Updates />
      <UserCount />
      <Information />
      <Offer />
      <CustomerVerdict />
      <FoundersInfo />
      <PlanInfo />
      <Faq />
      <AppInfo />
      <TrialCard />
    </>
  );
};

export default Home;
