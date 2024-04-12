


import Navbar from "@/components/Navbar";
import MainPoster from "@/components/MainPoster";
import UserCount from "@/components/UserCount";
import Information from "@/components/Information";
import Offer from "@/components/Offer";
import CustomerVerdict from "@/components/CustomerVerdict";
import FoundersInfo from "@/components/FoundersInfo";

import PlanInfo from "@/components/PlanInfo";
import Faq from "@/components/Faq";
import AppInfo from "@/components/AppInfo";
import Footer from "@/components/Footer";
import TrialCard from "@/components/Cards/TrialCard";






const Home = () => {
  
  return (
  <>
  {/* <Navbar/> */}
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