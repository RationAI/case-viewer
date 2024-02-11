import { CaseSearchParams } from "lib-empationapi/src/v3/extensions/types/case-search-params";

export const getRandomString = (length: number) => {
  const randomString = Math.random().toString(10);
  return randomString.substring(3, Math.min(3 + length, randomString.length - 1));
}

export const createSearchQueryFromUrl = (searchQueryParts: string[]) => {
  if(searchQueryParts.length % 2 !== 0) {
    return null
  }
  const searchParams: CaseSearchParams[] = []
  for (let i = 0; i < searchQueryParts.length; i = i + 2) {
    searchParams.push({ key: searchQueryParts[i], value: searchQueryParts[i + 1]})
  }

  return searchParams
}