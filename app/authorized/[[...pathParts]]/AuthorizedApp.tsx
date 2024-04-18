'use client'

import { getHierarchySpec, getIdentifierSeparator, getRootApi } from '@/app/utils'
import { getSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'
import { Root } from '@/EmpationAPI/src/v3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthorizedLayout from './AuthorizedLayout'
import { noAuthActive } from '@/app/utils/auth'

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
      if ((session && session.accessToken) || noAuthActive) {
        const root = await getRootApi(session);

        root.cases.caseExplorer.use(getIdentifierSeparator(), getHierarchySpec());
        setRootApi(root);
        /* await root.rationai.globalStorage.jobConfig.deleteJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582");
        await root.rationai.globalStorage.jobConfig.deleteJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582");
        await root.rationai.globalStorage.jobConfig.deleteJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582");
        const jobEAD = { 
          "name": "Prostate job",
          "description": "This is a description of prostate job",
          "appId": "4e485b74-413e-477d-8e09-2c38ae57e582",
          "modes": {
              "preprocessing": {
                  "inputs": {
                      "my_wsi": {
                        "_layer_loc": "background",
                        "lossless": false,
                        "protocol": "`{\"type\":\"leav3\",\"slide\":\"${data}\"}`"
                      }
                  },
                  "outputs": {
                      "probability_mask": {
                        "_layer_loc": "shader",
                        "name": "Cancer prediction",
                        "type": "heatmap",
                        "visible": 1,
                        "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                        "params": {
                          "opacity": 0.5,
                        }
                      },
                      "background_mask": {
                        "_layer_loc": "shader",
                        "name": "Mask",
                        "type": "heatmap",
                        "visible": 1,
                        "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                        "params": {
                          "threshold": 0.5,
                          "use_mode": "mask_clip",
                        }
                      },
                  }
              }
          }
        }
        await root.rationai.globalStorage.jobConfig.createJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582", jobEAD); */
      }
    };


    setupRootApi();
  }, []);

  // load feedback form
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://youtrack.rationai.cloud.e-infra.cz/static/simplified/form/form-entry.js";
    script.async = true;

    script.id="c5d3a8aa-1400-496a-9258-93bf0a2d2df3";
    script.setAttribute("data-yt-url", "https://youtrack.rationai.cloud.e-infra.cz");
  
    document.getElementsByTagName('head')[0].appendChild(script);
    return () => {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
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