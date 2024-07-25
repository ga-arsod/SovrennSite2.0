import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import UpdateBox from "./UpdateBox";
import { useSelector } from "react-redux";

const UpdateInfo = () => {
  const data = useSelector((store) => store.home.articleUpdates);
console.log(data,"data")
  return (
    <>
    <Grid container spacing={{ xs: 1, sm: 3 }} width="100%" >
  <Grid item xs={6} sm={3} >
    <UpdateBox name="Prime Article" number={data?.prime} />
  </Grid>
  <Grid item xs={6} sm={3} >
    <UpdateBox name="Discovery Bucket" number={data?.discovery} />
  </Grid>
  <Grid item xs={6} sm={3}>
    <UpdateBox name="Times Article" number={data?.news} />
  </Grid>
  <Grid item xs={6} sm={3} >
    <UpdateBox name="Knowledge" number={data?.macro} />
  </Grid>
</Grid>
    </>
  );
};

export default UpdateInfo;
