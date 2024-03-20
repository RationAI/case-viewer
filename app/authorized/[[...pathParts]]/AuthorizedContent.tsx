'use client'

import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getHierarchySpec, getIdentifierSeparator, getPathParts, getRootApi } from '../../utils';
import { Session } from 'next-auth';
import AnnotationsPage from '../annotations/AnnotationsPage';
import CaseContent from '../cases/case/CaseContent';
import CaseHierarchyLevel from '../cases/path/CaseHierarchyLevel';
import CaseSearchPage from '../cases/search/CaseSearchPage';
import UploadPage from '../upload/UploadPage';
import InvalidPathPage from '../../components/InvalidPathPage/InvalidPathPage';
import UserPage from '../user/UserPage';

const AuthorizedContent = () => {
  const { data: session } = useSession();
  const relativePath = usePathname();

  const [caseHierarchy, setCaseHierarchy] = useState<CaseHierarchy | undefined>();
  const [pathParts, setPathParts] = useState<string[]>(getPathParts(relativePath));

  useEffect(() => {
    setPathParts(getPathParts(relativePath));
  }, [relativePath]);

  useEffect(() => {
    const getCaseClass = async (session: Session) => {
      const casesClass = (await getRootApi(session)).cases;
      casesClass.caseExplorer.use(getIdentifierSeparator());
      const hierarchy = await casesClass.caseExplorer.hierarchy(getHierarchySpec());
      setCaseHierarchy(hierarchy);
    };

    if (session?.accessToken) {
      getCaseClass(session);
    }
  }, [session, session?.accessToken]);

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
          return <CaseSearchPage searchQuery={pathParts.slice(3)}/>;
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