"use client";
import React, { useEffect } from "react";
import DiscoveryCard from "../Cards/DiscoveryCard";
import { useDispatch } from "react-redux";
import {
  importantBucketsApi,
  bucketsApiCall,
} from "@/app/Redux/Slices/discoverySlice";
import { useSelector, shallowEqual } from "react-redux";
import { myBucketsApiCall } from "@/app/Redux/Slices/discoverySlice";
import CustomDiscoveryCard from "../Cards/CustomDiscoveryCard";

const Buckets = () => {
  const dispatch = useDispatch();
  const importantBucketsData = useSelector(
    (store) => store.discovery.importantBuckets
  );
  const { functional, sectoral, computed } = useSelector(
    (store) => store.discovery.buckets,
    shallowEqual
  );
  const myBuckets = useSelector(
    (store) => store.discovery.myBuckets,
    shallowEqual
  );

  useEffect(() => {
    dispatch(myBucketsApiCall());
  }, [dispatch]);
  useEffect(() => {
    dispatch(importantBucketsApi());
  }, [dispatch]);
  useEffect(() => {
    dispatch(bucketsApiCall());
  }, [dispatch]);

  return (
    <>
      <CustomDiscoveryCard title="My Buckets" data={myBuckets} />
      <DiscoveryCard title="Functional" data={functional} />
      <DiscoveryCard title="Sectoral" data={sectoral} />
      <DiscoveryCard title="Computed" data={computed} />
      <DiscoveryCard title="Important Buckets" data={importantBucketsData} />
    </>
  );
};

export default Buckets;
