import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";

import { Container } from "@mui/material";
import Buckets from "../../components/Discovery/Buckets"; 

const Discovery = () => {
  return (
    <>
      <Container>
        <DiscoveryHeading />
       

        <Buckets />
      </Container>
    </>
  );
};

export default Discovery;
