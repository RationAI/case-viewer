import React, { useContext } from 'react'
import CaseContent from './CaseContent';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';
import { getCaseNameFromLocalID } from '@/app/utils';
import Loading from '@/app/components/Loading/Loading';
import FetchError from '@/app/components/FetchError/FetchError';

type Props = {
  caseId: string,
}

const CasePage = ({ caseId }: Props) => {
  const rootApi = useContext(RootApiContext)

  const getCase = async () => {
    const cs = await rootApi!.cases.caseExplorer.getCase(caseId)
    return cs
  };

  const { isPending, isError, data: caseObj } = useQuery({
    queryKey: [`case_${caseId}`],
    queryFn: getCase,
  })

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    return <FetchError message='Cases' />
  }

  return (
    <div>
      <div className="font-sans font-semibold text-slate-500 text-xl">
        {getCaseNameFromLocalID(caseObj.local_id) || caseObj.id}
      </div>
      <CaseContent caseObj={caseObj} />
    </div>
  )
}

export default CasePage