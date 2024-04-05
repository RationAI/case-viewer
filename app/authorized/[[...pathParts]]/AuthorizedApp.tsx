'use client'

import { getHierarchySpec, getIdentifierSeparator, getRootApi } from '@/app/utils'
import { getSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'
import { Root } from '@/EmpationAPI/src/v3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthorizedLayout from './AuthorizedLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export const RootApiContext = createContext<Root | undefined>(undefined);

const AuthorizedApp = () => {
  const [rootApi, setRootApi] = useState<Root | undefined>();

  useEffect(() => {
    const setupRootApi = async () => {
      const session = await getSession()
      if (session && session.accessToken) {
        const root = (await getRootApi(session));

        async function refreshTokenHandler(event: object) {
          event["newToken"] = (await getSession())?.accessToken
        }

        root.addHandler("token-refresh", refreshTokenHandler)
        root.cases.caseExplorer.use(getIdentifierSeparator(), getHierarchySpec());
        setRootApi(root);
      }
    };

    setupRootApi();
  }, []);

  if(!rootApi) {
    <div>Loading...</div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootApiContext.Provider value={rootApi}>
        <AuthorizedLayout />
      </RootApiContext.Provider>
    </QueryClientProvider>
  )
} 

export default AuthorizedApp