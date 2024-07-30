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
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  return (
    <>
      <MainPoster />

      <Updates session={session} />

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
