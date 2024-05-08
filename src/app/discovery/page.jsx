import DiscoveryCard from "@/components/Cards/DiscoveryCard";
import SearchBar from "@/components/Common/SearchBar";
import DiscoveryHeading from "@/components/Discovery/DiscoveryHeading";
import { Container } from "@mui/material"
const Discovery=()=>{
    return(
        <>
        <Container >
        <DiscoveryHeading/>
        <SearchBar/>
        <DiscoveryCard/>
        </Container>
       
        </>
    )
}

export default Discovery;