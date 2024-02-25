import { Session } from 'next-auth';
import { cache } from 'react'
import { V3 } from '../../../EmpationAPI/src';
import { getHierarchySpec, getIdentifierSeparator } from './config';
import { CaseHierarchy } from '@/../EmpationAPI/src/v3/extensions/types/case-hierarchy-result';
import { CaseSearchParams } from '@/../EmpationAPI/src/v3/extensions/types/case-search-params';
import { Case } from '@/../EmpationAPI/src/v3/root/types/case';

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
  api.cases.caseExplorer.use(getIdentifierSeparator())
  return api.cases.caseExplorer
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

export const getSlideThumbnailURL = async (session: Session, slideId: string) => {
  const api = await getRootApi(session)
  const thumbnail = await api.slides.slideThumbnail("8c5608f3-a824-485c-b791-2a640405d87b", 500, 500)
  return URL.createObjectURL(thumbnail)
}