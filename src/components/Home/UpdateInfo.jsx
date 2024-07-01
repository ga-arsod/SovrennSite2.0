import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import UpdateBox from "./UpdateBox";
import { useSelector } from "react-redux";

const UpdateInfo = () => {
  const data = useSelector((store) => store.home.articleUpdates);

  return (
    <>
      <Grid container display="flex" gap={3}>
        <Grid item width="250px" height="172px">
          <UpdateBox name="Prime Article" number={data?.prime} />
        </Grid>
        <Grid item width="250px" height="172px">
          <UpdateBox name="Discovery Bucket" number={data?.discovery} />
        </Grid>
        <Grid item width="250px" height="172px">
          <UpdateBox name="Times Article" number={data?.news} />
        </Grid>
        <Grid item width="250px" height="172px">
          <UpdateBox name="knowledge" number={data?.macro} />
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateInfo;
