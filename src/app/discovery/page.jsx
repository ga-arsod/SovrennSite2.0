import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import SearchBar from "@/components/Common/SearchBar";
import DiscoveryHeader from "@/components/Discovery/DiscoveryHeader";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import { Box } from "@mui/material"
const Discovery=()=>{
    return(
        <>
        <Box paddingX="24px">
        <DiscoveryHeading/>
       
       
        <DiscoveryCard title="Functional"/>
        <DiscoveryCard title="Sectoral"/>
        <DiscoveryCard title="Important Buckets"/>
        </Box>
       
        </>
    )
}

export default Discovery;