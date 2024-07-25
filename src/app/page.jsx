


import MainPoster from "@/components/Home/MainPoster";
import UserCount from "@/components/Home/UserCount";
import Information from "@/components/Home/Information";
import CustomerVerdict from "@/components/Home/CustomerVerdict";
import FoundersInfo from "@/components/Home/FoundersInfo";
import Offer from "@/components/Home/Offer";
import PlanInfo from "@/components/Home/PlanInfo";
import Faq from "@/components/Home/Faq";
import AppInfo from "@/components/Home/AppInfo";
import Footer from "@/components/Home/Footer";
import TrialCard from "@/components/Cards/TrialCard";
import Updates from "@/components/Home/Updates";
import {auth} from "@/auth";

<<<<<<< HEAD
const Home = async() => {
 const session=await auth();
=======
const Home = () => {
>>>>>>> d2a73fc59bc64d5474bb022daa9106b147ef1e2b
 
  return (
    <>
      <MainPoster />

<<<<<<< HEAD
  <Updates session={session}/>
  

     
=======
      <Updates/>
>>>>>>> d2a73fc59bc64d5474bb022daa9106b147ef1e2b

      <UserCount />
      <Information />
      <Offer />
      <CustomerVerdict />
      <FoundersInfo />
      <PlanInfo />
      <Faq />

      <AppInfo />
      <TrialCard />
      <Footer />
    </>
  );
};

export default Home;
