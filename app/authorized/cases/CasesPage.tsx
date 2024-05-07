'use client'

import InvalidPathPage from '@/app/components/InvalidPathPage/InvalidPathPage'
import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result'
import React, { useContext } from 'react'
import CaseHierarchyLevel from './path/CaseHierarchyLevel'
import SlideContent from './path/SlideContent'
import CaseSearchPage from './search/CaseSearchPage'
import { getHierarchySpec } from '@/app/utils'
import CasePage from './case/CasePage'
import { PathPartsContext } from '../[[...pathParts]]/AuthorizedApp'

type Props = {
  caseHierarchy: CaseHierarchy,
}

const CasesPage = ({ caseHierarchy }: Props) => {
  const pathParts = useContext(PathPartsContext);

  const hierarchyDepth = getHierarchySpec().length;

  switch (pathParts[2]) {
    case "case":
      return <CasePage caseId={pathParts[3]}/>
    case "path":
      if (pathParts.length === hierarchyDepth + 4 || pathParts[pathParts.length - 2] === "OTHER") {
        return <SlideContent slideId={pathParts[pathParts.length - 1]}/>
      }
      return <CaseHierarchyLevel caseHierarchy={caseHierarchy}/>;
    case "search":
      return <CaseSearchPage searchQuery={pathParts.slice(3)}/>;
    default:
      <InvalidPathPage />;
  }
}

export default CasesPage