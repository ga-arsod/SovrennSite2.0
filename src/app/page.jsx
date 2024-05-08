
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
import MainHeading from "@/components/Education/MainHeading";
import TutorialSection from "@/components/Education/TutorialSection";
import LiveSession from "@/components/Education/LiveSession";
import LiveSessionInfo from "@/components/Education/LiveSessionInfo";
import ExpertInfo from "@/components/Education/ExpertInfo";
import LiveSessionSteps from "@/components/Education/LiveSessionSteps";







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