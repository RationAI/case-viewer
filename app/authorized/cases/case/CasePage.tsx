import React, { useContext, useEffect, useState } from 'react'
import CaseContent from './CaseContent';
import { getSession } from 'next-auth/react';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedLayout';

type Props = {
  caseId: string,
}

const CasePage = ({ caseId }: Props) => {
  const rootApi = useContext(RootApiContext)

  const [caseObj, setCaseObj] = useState<CaseH | undefined>()

  useEffect(() => {
    const getCaseObj = async () => {
      const session = await getSession()
      if (session && session.accessToken) {
        const cs = await rootApi.cases.caseExplorer.getCase(caseId)
        setCaseObj(cs);
      }
    };

    getCaseObj();
  }, [caseId, rootApi])

  if(!caseObj) {
    return <div>Loading...</div>
  }

  return (
    <CaseContent caseObj={caseObj} showCaseName={true} />
  )
}

export default CasePage