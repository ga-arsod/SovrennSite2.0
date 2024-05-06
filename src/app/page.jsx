
"suse client"

import Navbar from "@/components/Home/Navbar";
import MainPoster from "@/components/Home/MainPoster";
import UserCount from "@/components/Home/UserCount";
import Information from "@/components/Home/Information";
import Offer from "@/components/Home/Offer";
import CustomerVerdict from "@/components/Home/CustomerVerdict";
import FoundersInfo from "@/components/Home/FoundersInfo";

import PlanInfo from "@/components/Home/PlanInfo";
import Faq from "@/components/Home/Faq";
import AppInfo from "@/components/Home/AppInfo";
import Footer from "@/components/Home/Footer";
import TrialCard from "@/components/Cards/TrialCard";
import MainHeading from "@/components/Home2/MainHeading";
import TutorialSection from "@/components/Home2/TutorialSection";
import LiveSession from "@/components/Home2/LiveSession";
import LiveSessionInfo from "@/components/Home2/LiveSessionInfo";
import ExpertInfo from "@/components/Home2/ExpertInfo";
import LiveSessionSteps from "@/components/Home2/LiveSessionSteps";







const Home = () => {
  
  return (
  <>
  
  <Navbar/>
   <MainPoster/>
  {/* <MainHeading/> */}
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