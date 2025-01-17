import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import UpdateBox from "./UpdateBox";
import { useSelector } from "react-redux";
import Link from "next/link";

const UpdateInfo = () => {
  const data = useSelector((store) => store.home.articleUpdates);

  return (
    <>
    <Grid container spacing={{ xs: 1, sm: 3 }} width="100%"  marginTop={3}>
      
  <Grid item xs={6} sm={3} >
  <Link href="/prime"  style={{textDecoration:'none'}}>
    <UpdateBox name="Prime Article" number={data?.prime} />
    </Link>
  </Grid>
  <Grid item xs={6} sm={3} >
  <Link href="/discovery"  style={{textDecoration:'none'}}>
    <UpdateBox name="Discovery Bucket" number={data?.discovery} />
    </Link>
  </Grid>
  <Grid item xs={6} sm={3}>
  <Link href="/times"  style={{textDecoration:'none'}}>
    <UpdateBox name="Times Article" number={data?.news} />
    </Link>
  </Grid>
  <Grid item xs={6} sm={3} >
  <Link href="/knowledge"  style={{textDecoration:'none'}}>
    <UpdateBox name="Knowledge" number={data?.macro} />
    </Link>
  </Grid>
</Grid>
    </>
  );
};

export default UpdateInfo;
