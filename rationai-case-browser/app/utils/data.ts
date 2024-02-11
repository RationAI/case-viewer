import { Session } from 'next-auth';
import { cache } from 'react'
import { V3 } from 'lib-empationapi/src';
import { getHierarchySpec, getIdentifierSeparator } from './config';
import { CaseHierarchy } from 'lib-empationapi/src/v3/extensions/types/case-hierarchy-result';
import { CaseSearchParams } from 'lib-empationapi/src/v3/extensions/types/case-search-params';
import { Case } from 'lib-empationapi/src/v3/root/types/case';

export const getRootApi = async (session: Session) => {

  const api = new V3.Root({
    workbenchApiUrl: process.env.NEXT_EMPAIA_WB_URL || process.env.NEXT_PUBLIC_EMPAIA_WB_URL || "",
  })

  if(session.accessToken)
    await api.from(session.accessToken);

  return api;
}

export const getCaseExplorer = async (session: Session) => {
  const api = await getRootApi(session)
  api.cases.explorer.use(getIdentifierSeparator())
  return api.cases.explorer
}

export const getUserCaseHierarchy = async (session: Session) => {
  const explorer = await getCaseExplorer(session)

  let result: CaseHierarchy = { lastLevel: true, items: []};
  try {
    const hierarchy_spec = getHierarchySpec()
    result = await explorer.hierarchy(hierarchy_spec)
  } catch (e) {
    console.log("Fetch error")
  }
 
  return result
}

export const getCaseSearchResult = async (session: Session, query: CaseSearchParams[]) => {
  const explorer = await getCaseExplorer(session)
  
  let result: Case[] = [];
  try {
    result = (await explorer.search(query))
  } catch (e) {
    console.log("Fetch error")
  }
 
  return result
}