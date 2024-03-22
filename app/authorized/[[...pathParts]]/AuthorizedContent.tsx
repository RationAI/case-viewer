'use client'

import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result';
import React from 'react'
import AnnotationsPage from '../annotations/AnnotationsPage';
import CaseContent from '../cases/case/CaseContent';
import CaseHierarchyLevel from '../cases/path/CaseHierarchyLevel';
import CaseSearchPage from '../cases/search/CaseSearchPage';
import UploadPage from '../upload/UploadPage';
import InvalidPathPage from '../../components/InvalidPathPage/InvalidPathPage';
import UserPage from '../user/UserPage';
import CaseExplorer from '@/EmpationAPI/src/v3/extensions/case-explorer';

type Props = {
  caseExplorer: CaseExplorer | undefined,
  caseHierarchy: CaseHierarchy | undefined,
  pathParts: string[],
}

const AuthorizedContent = ({ caseExplorer, caseHierarchy, pathParts }: Props) => {  
  if (!caseHierarchy || !pathParts) {
    return <div>Loading...</div>
  }

  switch (pathParts[1]) {
    case "annotations":
      return <AnnotationsPage />;
    case "cases":
      switch (pathParts[2]) {
        case "case":
          return <CaseContent caseId={pathParts[3]}/>;
        case "path":
          return <CaseHierarchyLevel caseHierarchy={caseHierarchy}/>;
        case "search":
          return <CaseSearchPage caseExplorer={caseExplorer} searchQuery={pathParts.slice(3)}/>;
        default:
          <InvalidPathPage />;
      }
    case "upload":
      return <UploadPage />;
    case "user":
      return <UserPage />;
    default:
        <InvalidPathPage />;
  }
  
  return (
    <div>Congrats! You are authorized!</div>
  )
}

export default AuthorizedContent