'use client';

import Sidebar from '@/app/components/Sidebar/Sidebar';
import React, { useContext } from 'react';
import AuthorizedContent from './AuthorizedContent';
import { useQuery } from '@tanstack/react-query';
import { RootApiContext } from './AuthorizedApp';
import Loading from '@/app/components/Loading/Loading';
import FetchError from '@/app/components/FetchError/FetchError';

const AuthorizedLayout = () => {
  const rootApi = useContext(RootApiContext);

  const getCaseHierarchy = async () => {
    const hierarchy = await rootApi!.cases.caseExplorer.hierarchy();
    return hierarchy;
  };

  const { isPending, isError, data } = useQuery({
    queryKey: [`case_hierarchy`],
    queryFn: getCaseHierarchy,
  });

  return (
    <>
      <Sidebar caseHierarchy={data} isPending={isPending} isError={isError} />
      <div className="w-full overflow-y-scroll p-2">
        {isPending ? (
          <Loading />
        ) : isError ? (
          <FetchError message="Cases" />
        ) : (
          <AuthorizedContent caseHierarchy={data} />
        )}
      </div>
    </>
  );
};

export default AuthorizedLayout;
