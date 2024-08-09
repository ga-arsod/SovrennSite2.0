import LiveSession from "@/components/Education/LiveSession";
import LiveSessionInfo from "@/components/Education/LiveSessionInfo";
import LiveSessionSteps from "@/components/Education/LiveSessionSteps";
import MainHeading from "@/components/Education/MainHeading";
import TutorialSection from "@/components/Education/TutorialSection";
import Faq from "@/components/Home/Faq";

import FoundersInfo from "@/components/Home/FoundersInfo";
import LanguageModal from "@/components/Modal/LanguageModal";
import { useDispatch } from "react-redux";


const Education=()=>{
   
    return(
        <>
        <MainHeading/>
        <TutorialSection/>
        <LiveSession/>
       <LiveSessionInfo/>
       <FoundersInfo/>
       <LiveSessionSteps/>
       <Faq/>
       <LiveSession button={true}/>
      
      
        </>
    )
}
export default Education;