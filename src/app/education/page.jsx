import MainHeading from "@/components/Education/MainHeading";
import TutorialSection from "@/components/Education/TutorialSection";
import AppInfo from "@/components/Home/AppInfo";
import Footer from "@/components/Home/Footer";
import EducationTrialCard from "../../components/Cards/EducationTrialCard";

import FoundersInfo from "@/components/Home/FoundersInfo";

const Education = () => {
  return (
    <>
      <MainHeading />
      <TutorialSection />

      <FoundersInfo />
      <AppInfo />
      <EducationTrialCard />
      <Footer />
    </>
  );
};
export default Education;
