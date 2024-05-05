'use client'

import Sidebar from '@/app/components/Sidebar/Sidebar'
import React, { useContext } from 'react'
import AuthorizedContent from './AuthorizedContent'
import { useQuery } from '@tanstack/react-query'
import { RootApiContext } from './AuthorizedApp'

const AuthorizedLayout = () => {
  const rootApi = useContext(RootApiContext);

  const getCaseHierarchy = async () => {
    console.log(rootApi)
    const hierarchy = await rootApi!.cases.caseExplorer.hierarchy()
    return hierarchy; 
  };

  const { isPending, isError, data } = useQuery({
    queryKey: [`case_hierarchy2`],
    queryFn: getCaseHierarchy,
  })

  return (
    <>
      <Sidebar caseHierarchy={data} isPending={isPending} isError={isError}/>
      <div className="p-2 overflow-y-scroll w-full">
        {isPending ?
          <div>Loading...</div> : (
            isError ? 
            <div>Unable to fetch cases</div> :
            <AuthorizedContent caseHierarchy={data}/>
          )
        }
      </div>
    </>
  )
}

export default AuthorizedLayout