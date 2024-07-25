import React from "react";
import DiscoveryTable from "../../../components/Discovery/DiscoveryTable"
import DiscoveryHeader from "@/components/Discovery/DiscoveryHeader";
import { Container } from "@mui/material";
import DiscoveryTableContent from "../../../components/Discovery/DiscoverTableContent"

const DiscoveryTableComponent=()=>{
    return(
        <>
        <Container>
       <DiscoveryHeader/>
      <DiscoveryTableContent/>
      
      
       </Container>
        </>
    )
}
export default DiscoveryTableComponent;