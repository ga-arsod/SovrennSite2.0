import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import SearchBar from "@/components/Common/SearchBar";
import DiscoveryHeader from "@/components/Discovery/DiscoveryHeader";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import {Container } from "@mui/material"
const Discovery=()=>{
    return(
        <>
        <Container>
        <DiscoveryHeading/>
       
       
        <DiscoveryCard title="Functional"/>
        <DiscoveryCard title="Sectoral"/>
        <DiscoveryCard title="Important Buckets"/>
        </Container>
       
        </>
    )
}

export default Discovery;