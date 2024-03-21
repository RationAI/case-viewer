import { Session } from 'next-auth';
import { V3 } from '@/EmpationAPI/src';
import { getIdentifierSeparator, getSlideMaskSeparator } from './config';
import { CaseSearchParams } from '@/EmpationAPI/src/v3/extensions/types/case-search-params';

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
  await root.rationai.from(session.accessToken!)
  return root.rationai;
}

export const getCaseExplorer = async (session: Session) => {
  const api = await getRootApi(session)
  api.cases.caseExplorer.use(getIdentifierSeparator())
  return api.cases.caseExplorer
}

export const getCaseSearchResult = async (casesClass: V3.Cases, query: CaseSearchParams[]) => {
  await casesClass.caseExplorer.use(getIdentifierSeparator());
  const result = casesClass.caseExplorer.search(query);
 
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
  const defaultParams = {
    locale: "en",
    activeBackgroundIndex: 0,
    activeVisualizationIndex: 0
  }
  const defaultBg = [{    
      dataReference: 0,
      lossless: false,
  }];
  const defaultData = [slideId];
  let fetchedVis;
  try {
    fetchedVis = await rationaiApi.globalStorage.wsiMetadata.getVisualizations(slideId);
  } catch (e) {
    fetchedVis = {}
  }

  return {
    params: fetchedVis.params || defaultParams,
    data: fetchedVis.data || defaultData,
    background: fetchedVis.background && fetchedVis.background.data ? [fetchedVis.background] : defaultBg,
    visualizations: (fetchedVis.visualizations as Array<object> || []).concat([{
      "name": "Pure background",
      "lossless": true,
      "shaders": []
    }])
  }
}