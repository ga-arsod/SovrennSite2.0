import React from 'react'
import KnowledgeTestForm from '../../components/KnowledgeTest/KnowledgeTestForm'
import TestPerformance from '../../components/KnowledgeTest/TestPerformance'
import Information from '../../components/KnowledgeTest/Information'
import ShareKnowledgeScore from "../../components/Modal/ShareKnowledgeScore"
const page = () => {
  return (
   <>
   {/* <KnowledgeTestForm/> */}
   
   <TestPerformance/>
   <Information/>
   </>
  )
}

export default page
