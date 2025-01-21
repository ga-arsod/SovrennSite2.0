"use client";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import { useEffect, useState } from "react";

import { Container } from "@mui/material";

import { useSelector } from "react-redux";
import Spinner from "@/components/Common/Spinner";

import { useDispatch } from "react-redux";
import {
  myBucketsApiCall,
  bucketsApiCall,
  discoveryFiltersApiCall,
} from "../Redux/Slices/discoverySlice";
import ScrollCircle from "../../components/Common/ScrollCircle";
import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import CustomDiscoveryCard from "@/components/Cards/CustomDiscoveryCard";
import DiscoveryFilter from "@/components/Discovery/DiscoveryFilter";

const Discovery = () => {
  const [isMetaLoading, setIsMetaLoading] = useState(true);
  const { isAllBucketsLoading, isMyBucketsLoading, filtersData } = useSelector(
    (store) => store.discovery
  );
  const { userDetails, isAuth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const { functional, sectoral, important } = useSelector(
    (store) => store.discovery.buckets
  );
  const myBuckets = useSelector((store) => store.discovery.myBuckets);

  useEffect(() => {
    if (isAllBucketsLoading || isMyBucketsLoading) {
      document.title = "Loading Stock Discovery...";
      setIsMetaLoading(true);

    
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
      setIsMetaLoading(false);

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
  }, [isAllBucketsLoading, isMyBucketsLoading]);

  useEffect(() => {
    dispatch(myBucketsApiCall());
  }, [dispatch, isAuth]);

  useEffect(() => {
    dispatch(bucketsApiCall());
    dispatch(discoveryFiltersApiCall());
  }, [dispatch]);

  const headingObject = {
    heading: "Stock Discovery",
    description:
      "Explore our thematic buckets of stocks for capturing the decadal  trends in your personal investment portfolio.",
  };

  if (isAllBucketsLoading && isMyBucketsLoading) {
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
        <DiscoveryFilter filtersData={filtersData} />
        {(userDetails?.subscriptions?.includes("full-access") ||
          userDetails?.subscriptions?.includes("monthly") ||
          userDetails?.subscriptions?.includes("quarterly") ||
          userDetails?.subscriptions?.includes("life") ||
          userDetails?.subscriptions?.includes("basket") ||
          userDetails?.subscriptions?.includes("trial")) &&
        myBuckets?.length &&
        isAuth ? (
          <CustomDiscoveryCard title="My Buckets" data={myBuckets} />
        ) : (
          <></>
        )}

        <DiscoveryCard title="Functional" data={functional} />
        <DiscoveryCard title="Sectoral" data={sectoral} />

        <DiscoveryCard title="Important Buckets" data={important} />
        <ScrollCircle />
      </Container>
    </>
  );
};

export default Discovery;
