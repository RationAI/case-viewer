'use client';

import {
  getHierarchyNameOverrides,
  getHierarchySpec,
  getIdentifierSeparator,
  getPathParts,
  getRootApi,
} from '@/app/utils';
import { getSession } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react';
import { Root } from '@/EmpationAPI/src/v3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { noAuthActive } from '@/app/utils/auth';
import Loading from '@/app/components/Loading/Loading';
import AuthorizedLayout from './AuthorizedLayout';
import { usePathname } from 'next/navigation';

// TanStack Query Client global configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export const RootApiContext = createContext<Root | undefined>(undefined);
export const PathPartsContext = createContext<string[]>([]);

const AuthorizedApp = () => {
  const relativePath = usePathname();

  const [pathParts, setPathParts] = useState<string[]>(
    getPathParts(relativePath),
  );
  const [rootApi, setRootApi] = useState<Root | undefined>();

  useEffect(() => {
    setPathParts(getPathParts(relativePath));
  }, [relativePath]);

  useEffect(() => {
    const setupRootApi = async () => {
      const session = await getSession();
      if ((session && session.accessToken) || noAuthActive) {
        const root = await getRootApi(session);

        const id = getIdentifierSeparator();
        const hierSpec = getHierarchySpec();
        const overrides = getHierarchyNameOverrides();

        root.cases.caseExplorer.use(id, hierSpec, overrides);
        setRootApi(root);
      }
    };

    setupRootApi();
  }, []);

  // Load assets for feedback form
  useEffect(() => {
    const script = document.createElement('script');

    script.src =
      'https://youtrack.rationai.cloud.e-infra.cz/static/simplified/form/form-entry.js';
    script.async = true;

    script.id = 'c5d3a8aa-1400-496a-9258-93bf0a2d2df3';
    script.setAttribute(
      'data-yt-url',
      'https://youtrack.rationai.cloud.e-infra.cz',
    );

    document.getElementsByTagName('head')[0].appendChild(script);
    return () => {
      document.getElementsByTagName('head')[0].removeChild(script);
    };
  }, []);

  if (!rootApi) {
    <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootApiContext.Provider value={rootApi}>
        <PathPartsContext.Provider value={pathParts}>
          <AuthorizedLayout />
        </PathPartsContext.Provider>
      </RootApiContext.Provider>
    </QueryClientProvider>
  );
};

export default AuthorizedApp;
