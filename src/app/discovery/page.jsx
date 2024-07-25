import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
<<<<<<< HEAD
=======
import DiscoveryTable from "@/components/Discovery/DiscoveryTable";
import {Container } from "@mui/material"
import Buckets from "../../components/Discovery/Buckets"
const Discovery=()=>{
    return(
        <>
        <Container>
        <DiscoveryHeading/>
       
        <CustomDiscoveryCard title="My Buckets" />
      
        <Buckets/>
        <DiscoveryTable/>
        </Container>
       
        </>
    )
}
>>>>>>> d2a73fc59bc64d5474bb022daa9106b147ef1e2b

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
