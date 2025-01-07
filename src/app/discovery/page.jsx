"use client";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import { useEffect,useState } from "react";

import { Container } from "@mui/material";

import { useSelector } from "react-redux";
import Spinner from "@/components/Common/Spinner";

import Head from "next/head";
import { useDispatch } from "react-redux";
import {
  myBucketsApiCall,
  bucketsApiCall,
  discoveryFiltersApiCall
} from "../Redux/Slices/discoverySlice";
import ScrollCircle from "../../components/Common/ScrollCircle"
import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import CustomDiscoveryCard from "@/components/Cards/CustomDiscoveryCard";
import DiscoveryFilter from "@/components/Discovery/DiscoveryFilter";

const Discovery = () => {
  const [showScroll, setShowScroll] = useState(false);
  const { isAllBucketsLoading, isMyBucketsLoading,filtersData } = useSelector(
    (store) => store.discovery
  );
  const { userDetails } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const { functional, sectoral, important } = useSelector(
    (store) => store.discovery.buckets
  );
  const myBuckets = useSelector((store) => store.discovery.myBuckets);
 
 
  useEffect(() => {
    dispatch(myBucketsApiCall());
  }, [dispatch]);

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
        <Head>
          <title>Explore Thematic Buckets</title>
          <link
            rel="canonical"
            href={`https://www.sovrenn.com/discovery`}
            key="canonical"
          />
        </Head>
        <Container>
          <DiscoveryHeading />
          <Spinner margin={2} />
        </Container>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>
          Investors are Going Crazy Over this Groundbreaking Stock Discovery
        </title>
        <meta
          name="description"
          content="Stock Discovery! Investors can't get enough of this groundbreaking opportunity. Find out why everyone is going crazy over it today.!"
        />

        <meta
          property="og:title"
          content="Investors are Going Crazy Over this Groundbreaking Stock Discovery"
        />
        <meta
          property="og:description"
          content="Stock Discovery! Investors can't get enough of this groundbreaking opportunity. Find out why everyone is going crazy over it today."
        />
        <link
          rel="canonical"
          href={`https://www.sovrenn.com/discovery`}
          key="canonical"
        />
      </Head>
      <Container>
        <DiscoveryHeading headingObject={headingObject} />
        <DiscoveryFilter filtersData={filtersData} />
        {(userDetails?.subscriptions?.includes("full-access") ||
          userDetails?.subscriptions?.includes("monthly") ||
          userDetails?.subscriptions?.includes("quarterly") ||
          userDetails?.subscriptions?.includes("life") ||
          userDetails?.subscriptions?.includes("basket") ||
          userDetails?.subscriptions?.includes("trial")) &&
          myBuckets?.length ?
            <CustomDiscoveryCard title="My Buckets" data={myBuckets} />:<></>
          }

        <DiscoveryCard title="Functional" data={functional} />
        <DiscoveryCard title="Sectoral" data={sectoral} />

        <DiscoveryCard title="Important Buckets" data={important} />
       <ScrollCircle/>
      </Container>
    </>
  );
};

export default Discovery;
