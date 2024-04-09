

import { Box, Typography } from "@mui/material";
import styles from "../styles/page.module.css";
import Navbar from "@/components/Navbar";
import MainPoster from "@/components/MainPoster";
import UserCount from "@/components/UserCount";
import Information from "@/components/Information";
import Offer from "@/components/Offer";
import CustomerVerdict from "@/components/CustomerVerdict";
import FoundersInfo from "@/components/FoundersInfo";
import FoundersCard from "@/components/Cards/FoundersCard";
import PlanCard from "@/components/PlanCard";
import PlanInfo from "@/components/PlanInfo";
import Faq from "@/components/Faq";
import AppInfo from "@/components/AppInfo";
import Footer from "@/components/Footer";
import TrialCard from "@/components/Cards/TrialCard";






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
 <Faq/>
 
 <AppInfo/>
 <TrialCard/>
<Footer/>
  </>
  );
};

export default Home;