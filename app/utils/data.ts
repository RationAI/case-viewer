import { Session } from 'next-auth';
import { V3 } from '@/EmpationAPI/src';
import { getSlideMaskSeparator } from './config';
import { Root } from '@/EmpationAPI/src/v3';

export const getRootApi = async (session: Session) => {

  const api = new V3.Root({
    workbenchApiUrl: process.env.NEXT_EMPAIA_WB_URL || process.env.NEXT_PUBLIC_EMPAIA_WB_URL || "",
  })

  if(session.accessToken)
    await api.from(session.accessToken);

  return api;
}

export const getCaseSlides = async (rootApi: Root, caseId: string) => {
  rootApi.cases.wsiExplorer.use(getSlideMaskSeparator(), "m")
  const slides = (await rootApi.cases.wsiExplorer.slides(caseId)).filter((slide) => !slide.deleted)
  return slides
}

export const getCaseMasks = async (session: Session, caseId: string) => {
  const api = await getRootApi(session);
  api.cases.wsiExplorer.use(getSlideMaskSeparator(), "m")
  const masks = await api.cases.wsiExplorer.masks(caseId)
  return masks
}

export const getSlideThumbnailURL = async (rootApi: Root, slideId: string) => {
  try {
    const thumbnail = await rootApi.slides.slideThumbnail(slideId, 500, 500);
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