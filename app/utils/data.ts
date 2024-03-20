import { Session } from 'next-auth';
import { V3 } from '@/EmpationAPI/src';
import { getHierarchySpec, getIdentifierSeparator, getSlideMaskSeparator } from './config';
import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result';
import { CaseSearchParams } from '@/EmpationAPI/src/v3/extensions/types/case-search-params';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';

export const getRootApi = async (session: Session) => {

  const api = new V3.Root({
    workbenchApiUrl: process.env.NEXT_EMPAIA_WB_URL || process.env.NEXT_PUBLIC_EMPAIA_WB_URL || "",
  })

  if(session.accessToken)
    await api.from(session.accessToken);

  return api;
}

export const getRationAIApi = async (session: Session) => {
  const root = await getRootApi(session);
  await root.rationai.from(session.accessToken)
  return root.rationai;
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

export const getCaseInfo = async (session: Session, caseId: string) => {
  const api = await getRootApi(session);
  const caseObj = (await api.cases.get(caseId))
  return caseObj
}

export const getCaseSlides = async (session: Session, caseId: string) => {
  const api = await getRootApi(session);
  api.cases.wsiExplorer.use(getSlideMaskSeparator(), "m")
  const slides = (await api.cases.wsiExplorer.slides(caseId)).filter((slide) => !slide.deleted)
  return slides
}

export const getCaseMasks = async (session: Session, caseId: string) => {
  const api = await getRootApi(session);
  api.cases.wsiExplorer.use(getSlideMaskSeparator(), "m")
  const masks = await api.cases.wsiExplorer.masks(caseId)
  return masks
}

export const getSlideThumbnailURL = async (session: Session, slideId: string) => {
  const api = await getRootApi(session)
  try {
    const thumbnail = await api.slides.slideThumbnail(slideId, 500, 500);
    return URL.createObjectURL(thumbnail)
  } catch (e) {
    return;
  }
}

export const getSlideVisualizations = async (slideId: string, rationaiApi: V3.RationAI) => {
  const defaultVis = {    
    data: [slideId],
    background: [
        {
            dataReference: 0,
            lossless: false,
        }
    ],
  }
  try {
    const vis = await rationaiApi.globalStorage.wsiMetadata.getVisualizations(slideId);
    return {
      ...defaultVis,
      ...vis,
    }
  } catch (e) {
    return defaultVis;
  }
}