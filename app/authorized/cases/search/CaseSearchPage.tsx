'use client'

import { createSearchQueryFromUrl, getNumberOfGroupsFromRegexString } from "@/app/utils/utilities";
import { getConfig } from "@/app/utils/config";
import CaseSearchForm from "./components/CaseSearchForm";
import CaseSearchResult from "./components/CaseSearchResult";
import CaseExplorer from "@/EmpationAPI/src/v3/extensions/case-explorer";

type Props = {
  caseExplorer: CaseExplorer,
  searchQuery: string[],
}

export default function CaseSearchPage({ caseExplorer, searchQuery }: Props) {

  const identifierParts = getNumberOfGroupsFromRegexString(getConfig().local_id_separator || "")

  if(searchQuery.length === 0) {
    return (
      <CaseSearchForm caseExplorer={caseExplorer} identifierParts={identifierParts}/>
    )
  }

  const query = createSearchQueryFromUrl(searchQuery)

  if(query === null) {
    return (
      <div>
        <div>Invalid search</div>
      </div>
    )
  }
  return (
    <CaseSearchResult caseExplorer={caseExplorer} query={query}/>
  );
}
