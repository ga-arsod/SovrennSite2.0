"use client"
import React, { useEffect } from "react";
import MainHeading from "@/components/Education/MainHeading";
import TutorialSection from "@/components/Education/TutorialSection";
import AppInfo from "@/components/Home/AppInfo";
import EducationTrialCard from "../../components/Cards/EducationTrialCard";
import FoundersInfo from "@/components/Home/FoundersInfo";
import TrialCard from "@/components/Cards/TrialCard";
import MentorshipPromo from "../../components/Mentorship/MentorshipPromo"

const Education = () => {
  useEffect(() => {
    const title = "Unlock the Secrets of Investing: Reserve your Learning Slot Today";
    const description = "Ready to take control of your financial future? Reserve your learning slot today and discover the secrets to successful investing.";
    const canonicalUrl = "https://www.sovrenn.com/education";

   
    if (typeof document !== "undefined") {
      document.title = title;

    
      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }

      let metaTitle = document.querySelector("meta[property='og:title']");
      if (metaTitle) {
        metaTitle.setAttribute("content", title);
      } else {
        metaTitle = document.createElement("meta");
        metaTitle.setAttribute("property", "og:title");
        metaTitle.setAttribute("content", title);
        document.head.appendChild(metaTitle);
      }

      let metaDescriptionOg = document.querySelector("meta[property='og:description']");
      if (metaDescriptionOg) {
        metaDescriptionOg.setAttribute("content", description);
      } else {
        metaDescriptionOg = document.createElement("meta");
        metaDescriptionOg.setAttribute("property", "og:description");
        metaDescriptionOg.setAttribute("content", description);
        document.head.appendChild(metaDescriptionOg);
      }

      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonicalUrl);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonicalUrl);
        document.head.appendChild(canonicalLink);
      }
    }
  }, []);

  return (
    <>
      <MainHeading />
      <TutorialSection />
      <FoundersInfo />
      <MentorshipPromo/>
      <AppInfo />
      <TrialCard />
    </>
  );
};

export default Education;
