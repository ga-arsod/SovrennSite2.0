"use client";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import { useEffect } from "react";
import { Container } from "@mui/material";

import { useSelector } from "react-redux";
import Spinner from "@/components/Common/Spinner";
import Head from "next/head";
import { useDispatch } from "react-redux";
import {
  myBucketsApiCall,
  bucketsApiCall,
} from "../Redux/Slices/discoverySlice";
import { useSelectedLayoutSegment } from "next/navigation";
import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import CustomDiscoveryCard from "@/components/Cards/CustomDiscoveryCard";
import DiscoveryFilter from "@/components/Discovery/DiscoveryFilter"

const Discovery = () => {
  const { isAllBucketsLoading, isMyBucketsLoading } = useSelector(
    (store) => store.discovery
  );
  const dispatch = useDispatch();

  const { functional, sectoral, important } = useSelector(
    (store) => store.discovery.buckets
  );
  const myBuckets = useSelector((store) => store.discovery.myBuckets);
  useEffect(() => {
    dispatch(myBucketsApiCall());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetching All Buckets Data...");
    dispatch(bucketsApiCall());
  }, [dispatch]);
  console.log(isAllBucketsLoading, isMyBucketsLoading);

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
                <title>Investors are Going Crazy Over this Groundbreaking Stock Discovery</title>
                <meta name="description" content="Stock Discovery! Investors can't get enough of this groundbreaking opportunity. Find out why everyone is going crazy over it today.!" />

                <meta property="og:title" content="Investors are Going Crazy Over this Groundbreaking Stock Discovery" />
                <meta property="og:description" content="Stock Discovery! Investors can't get enough of this groundbreaking opportunity. Find out why everyone is going crazy over it today." />
                <link
                    rel="canonical"
                    href={`https://www.sovrenn.com/discovery`}
                    key="canonical"
                />

            </Head>
      <Container>
        <DiscoveryHeading />
        <DiscoveryFilter/>
        <CustomDiscoveryCard title="My Buckets" data={myBuckets} />
        <DiscoveryCard title="Functional" data={functional} />
        <DiscoveryCard title="Sectoral" data={sectoral} />

        <DiscoveryCard title="Important Buckets" data={important} />
      </Container>
    </>
  );
};

export default Discovery;
