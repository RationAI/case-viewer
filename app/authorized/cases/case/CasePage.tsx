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
    <div>
      <div className="font-sans font-semibold text-slate-500 text-xl pl-2">
        {data.local_id || data.id}
      </div>
      <CaseContent caseObj={data} basePath="/authorized/cases/path"/>
    </div>
  )
}

export default CasePage