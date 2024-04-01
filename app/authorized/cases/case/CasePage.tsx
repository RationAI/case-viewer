import React, { useContext } from 'react'
import CaseContent from './CaseContent';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';

type Props = {
  caseId: string,
}

const CasePage = ({ caseId }: Props) => {
  const rootApi = useContext(RootApiContext)

  const getCase = async () => {
    const cs = await rootApi!.cases.caseExplorer.getCase(caseId)
    return cs
  };

  const { isPending, isError, data } = useQuery({
    queryKey: [`case_${caseId}`],
    queryFn: getCase,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Unable to fetch case</div>
  }

  return (
    <CaseContent caseObj={data} showCaseName={true} basePath="/authorized/cases/path"/>
  )
}

export default CasePage