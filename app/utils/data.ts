import { Session } from 'next-auth';
import { V3 } from '@/EmpationAPI/src';
import { getSlideMaskSeparator } from './config';
import { Root } from '@/EmpationAPI/src/v3';
import { getSession } from 'next-auth/react';

export const getRootApi = async (session: Session | null) => {
  const api = new V3.Root({
    workbenchApiUrl: process.env.NEXT_PUBLIC_EMPAIA_WB_URL || "",
  })

  if(session && session.accessToken) {
    await api.from(session.accessToken);
    async function refreshTokenHandler(event: object) {
      event["newToken"] = (await getSession())?.accessToken
    }
    api.addHandler("token-refresh", refreshTokenHandler)
  } else {
    await api.use(process.env.NEXT_PUBLIC_NO_AUTH_USER_ID || "anonymous");
  }
  return api;
}

export const getCaseSlides = async (rootApi: Root, caseId: string) => {
  rootApi.cases.wsiExplorer.use(getSlideMaskSeparator(), "m")
  const slides = (await rootApi.cases.wsiExplorer.slides(caseId)).filter((slide) => !slide.deleted)
  return slides
}

export const getSlideThumbnail = async (rootApi: Root, slideId: string) => {
  try {
    const thumbnail = await rootApi.slides.slideThumbnail(slideId, 500, 500);
    return thumbnail
  } catch (e) {
    try {
      const thumbnail = await rootApi.slides.slideThumbnail(slideId, 250, 250);
      return thumbnail
    } catch (e) {
      return;
    }
  }
}

export const getSlideMetadata = async (rootApi: Root, slideId: string,) => {
  const metadata = await rootApi.rationai.globalStorage.wsiMetadata.getSlideMetadata(slideId);
  return metadata;
}

export const getSlideVisualizations = async (slideId: string, rationaiApi: V3.RationAI) => {
  let fetchedVis;
  try {
    fetchedVis = await rationaiApi.globalStorage.wsiMetadata.getVisualizations(slideId);
  } catch (e) {
    fetchedVis = {}
  }

  return  (fetchedVis.visualizations as Array<object> || []).concat([{
      "name": "Pure background",
      "lossless": true,
      "shaders": []
  }])
}