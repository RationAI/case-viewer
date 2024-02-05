import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { V3 } from 'lib-empationapi/src';

export const getRandomString = (length: number) => {
  const randomString = Math.random().toString(10);
  return randomString.substring(3, Math.min(3 + length, randomString.length - 1));
}

export const getRootApi = async (session: Session) => {

  const api = new V3.Root({
    workbenchApiUrl: process.env.EMPAIA_WB_URL || process.env.NEXT_PUBLIC_EMPAIA_WB_URL || "",
  })

  await api.from(session.accessToken || "");

  return api;
}

export const getCurrentUsersCases = async (session: Session) => {
  const api = await getRootApi(session)

  let result
  try {
    result = await api.cases.list()
  } catch (e) {
    console.log("Error")
  }
 
  return result
}