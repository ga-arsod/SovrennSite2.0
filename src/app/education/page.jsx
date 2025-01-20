import MainHeading from "@/components/Education/MainHeading";
import TutorialSection from "@/components/Education/TutorialSection";
import AppInfo from "@/components/Home/AppInfo";

import EducationTrialCard from "../../components/Cards/EducationTrialCard";

import FoundersInfo from "@/components/Home/FoundersInfo";
import Head from "next/head";
import TrialCard from "@/components/Cards/TrialCard";

const Education = () => {
  return (
    <>
      <Head>
        <title>
          Unlock the Secrets of Investing: Reserve your Learning Slot Today
        </title>
        <meta
          name="description"
          content="Ready to take control of your financial future? Reserve your learning slot today and discover the secrets to successful investing."
        />

        <meta
          property="og:title"
          content="Unlock the Secrets of Investing: Reserve your Learning Slot Today"
        />
        <meta
          property="og:description"
          content="Ready to take control of your financial future? Reserve your learning slot today and discover the secrets to successful investing."
        />

        <link
          rel="canonical"
          href={`https://www.sovrenn.com/education`}
          key="canonical"
        />
      </Head>
      <MainHeading />
      <TutorialSection />

      <FoundersInfo />
      <AppInfo />
      <TrialCard/>
    </>
  );
};
export default Education;
