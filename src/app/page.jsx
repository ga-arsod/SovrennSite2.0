

import { Box, Typography } from "@mui/material";
import styles from "../styles/page.module.css";
import Navbar from "@/components/Navbar";
import MainPoster from "@/components/MainPoster";
import UserCount from "@/components/UserCount";
import Information from "@/components/Information";
import Offer from "@/components/Offer";
import CustomerVerdict from "@/components/CustomerVerdict";
import FoundersInfo from "@/components/FoundersInfo";
import FoundersCard from "@/components/FoundersCard";
import PlanCard from "@/components/PlanCard";
import PlanInfo from "@/components/PlanInfo";





const Home = () => {
  
  return (
  <>
  <MainPoster/>
 <UserCount/>
 <Information/>
 <Offer/>
 <CustomerVerdict/>
 <FoundersInfo/>
<PlanInfo/>
 
  </>
  );
};

export default Home;