'use client'

import Sidebar from '@/app/components/Sidebar/Sidebar'
import { getHierarchySpec, getIdentifierSeparator, getPathParts, getRootApi } from '@/app/utils'
import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result'
import { getSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AuthorizedContent from './AuthorizedContent'
import CaseExplorer from '@/EmpationAPI/src/v3/extensions/case-explorer'

const AuthorizedLayout = () => {
  const relativePath = usePathname();

  const [caseExplorer, setCaseExplorer] = useState<CaseExplorer | undefined>();
  const [caseHierarchy, setCaseHierarchy] = useState<CaseHierarchy | undefined>();
  const [pathParts, setPathParts] = useState<string[]>(getPathParts(relativePath));

  useEffect(() => {
    setPathParts(getPathParts(relativePath));
  }, [relativePath]);

  useEffect(() => {
    const getCaseClass = async () => {
      const session = await getSession()
      if (session && session.accessToken) {
        const casesClass = (await getRootApi(session)).cases;
        casesClass.caseExplorer.use(getIdentifierSeparator());
        setCaseExplorer(casesClass.caseExplorer);
        const hierarchy = await casesClass.caseExplorer.hierarchy(getHierarchySpec());
        setCaseHierarchy(hierarchy);
      }
    };

    getCaseClass();
  }, []);
  return (
    <>
      <Sidebar caseHierarchy={caseHierarchy}/>
      <div className="p-2 overflow-scroll w-full">
        <AuthorizedContent caseExplorer={caseExplorer} caseHierarchy={caseHierarchy} pathParts={pathParts}/>
      </div>
    </>
  )
}

export default AuthorizedLayout