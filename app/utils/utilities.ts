import { CaseSearchParams } from "@/EmpationAPI/src/v3/extensions/types/case-search-params";
import { getConfig } from "./config";

export const getRandomString = (length: number) => {
  const randomString = Math.random().toString(10);
  return randomString.substring(3, Math.min(3 + length, randomString.length - 1));
}

export const createSearchQueryFromUrl = (searchQueryParts: string[]) => {
  if(searchQueryParts.length % 2 !== 0) {
    return null
  }

  const allowedSearchKeys = getConfig().searchKeys

  if(!allowedSearchKeys) {
    return null
  }

  const searchParams: CaseSearchParams[] = []
  for (let i = 0; i < searchQueryParts.length; i = i + 2) {
    if (!allowedSearchKeys.includes(searchQueryParts[i])) {
      return null
    }
    searchParams.push({ key: searchQueryParts[i], value: searchQueryParts[i + 1]})
  }

  return searchParams
}

export const getNumberOfGroupsFromRegexString = (regexString: string) => {
  const groups = new RegExp(regexString.toString() + '|').exec('') as RegExpExecArray;
  return groups.length - 1;
}

export const getPathParts = (relativePath: string) => {
  return relativePath.split('/').filter(Boolean).slice(3);
}