import CustomDiscoveryCard from "@/components/Cards/CustomDiscoveryCard";
import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import SearchBar from "@/components/Common/SearchBar";
import DiscoveryHeader from "@/components/Discovery/DiscoveryHeader";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
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

export default Discovery;