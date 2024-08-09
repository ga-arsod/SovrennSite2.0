import React from 'react'
import KnowledgeHeader from "../../components/Knowledge/KnowledgeHeader"

import KnowledgeCard from '../../components/Cards/KnowledgeCard'
import KnowledgeSearchFilter from "../../components/Knowledge/KnowledgeSearchFilter"
const Knowledge = () => {
  return (
    <>
    <KnowledgeHeader/>
    <KnowledgeSearchFilter/>
    <KnowledgeCard/>
    
    </>
  )
}

export default Knowledge
