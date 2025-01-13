import MainPoster from "@/components/Home/MainPoster";
import UserCount from "@/components/Home/UserCount";
import Information from "@/components/Home/Information";
import CustomerVerdict from "@/components/Home/CustomerVerdict";
import FoundersInfo from "@/components/Home/FoundersInfo";
import Offer from "@/components/Home/Offer";
import PlanInfo from "@/components/Home/PlanInfo";
import Faq from "@/components/Home/Faq";
import AppInfo from "@/components/Home/AppInfo";

import TrialCard from "@/components/Cards/TrialCard";
import Updates from "@/components/Home/Updates";
import { auth } from "@/auth";
import Head from "next/head";

const Home = async () => {
  const session = await auth();

  return (
    <>
      <Head>
        <title>
          Information platform to discover the best MicroCap stocks to buy in
          India
        </title>
        <meta
          name="description"
          content="Sovrenn: Information platform to discover the best MicroCap stocks to buy in India. We teach investing and provide high quality and timely information to our readers which empowers them to take smart investment decisions"
        />

        <meta
          property="og:title"
          content="Information platform to discover the best MicroCap stocks to buy in India"
        />
        <meta
          property="og:description"
          content="Sovrenn: Information platform to discover the best MicroCap stocks to buy in India. We teach investing and provide high quality and timely information to our readers which empowers them to take smart investment decisions"
        />
        <meta
          property="og:image"
          content="https://sovrenn-website-images.s3.ap-south-1.amazonaws.com/SocialMediaPreviewThumbnail.png"
        />
        <meta property="og:url" content="https://www.sovrenn.com" />

        <link rel="canonical" href="https://www.sovrenn.com" key="canonical" />
      </Head>
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
    </>
  );
};

export default Home;
