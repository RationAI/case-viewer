'use client'

import Sidebar from '@/app/components/Sidebar/Sidebar'
import { getHierarchySpec, getIdentifierSeparator, getRootApi } from '@/app/utils'
import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result'
import { getSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'
import AuthorizedContent from './AuthorizedContent'
import { Root } from '@/EmpationAPI/src/v3'

export const RootApiContext = createContext<Root | undefined>(undefined)

const AuthorizedLayout = () => {

  const [rootApi, setRootApi] = useState<Root | undefined>();
  const [caseHierarchy, setCaseHierarchy] = useState<CaseHierarchy | undefined>();

  useEffect(() => {
    const getCaseClass = async () => {
      const session = await getSession()
      if (session && session.accessToken) {
        const root = (await getRootApi(session));

        async function refreshTokenHandler(event: object) {
          console.log("EVENT HANDLER EXECUTED")
          event["newToken"] = (await getSession())?.accessToken
        }

        root.addHandler("token-refresh", refreshTokenHandler, {}, 0)
        setRootApi(root);

        root.cases.caseExplorer.use(getIdentifierSeparator(), getHierarchySpec());
        const hierarchy = await root.cases.caseExplorer.hierarchy();
        setCaseHierarchy(hierarchy);
      }
    };

    getCaseClass();
  }, []);
  return (
    <>
      <Sidebar caseHierarchy={caseHierarchy}/>
      <div className="p-2 overflow-scroll w-full">
        {(!rootApi || !caseHierarchy) ?
          <div>Loading...</div> :
          <RootApiContext.Provider value={rootApi}>
            <AuthorizedContent caseHierarchy={caseHierarchy}/>
          </RootApiContext.Provider>
        }
      </div>
    </>
  )
}

export default AuthorizedLayout