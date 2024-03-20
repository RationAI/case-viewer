'use client'

import { createSearchQueryFromUrl, getNumberOfGroupsFromRegexString } from "@/app/utils/utilities";
import { getConfig } from "@/app/utils/config";
import CaseSearchForm from "./components/CaseSearchForm";
import CaseSearchResult from "./components/CaseSearchResult";

type Props = {
  searchQuery: string[],
}

export default function CaseSearchPage({ searchQuery }: Props) {

  const identifierParts = getNumberOfGroupsFromRegexString(getConfig().local_id_separator || "")

  if(!searchQuery) {
    return (
      <CaseSearchForm identifierParts={identifierParts}/>
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
    <CaseSearchResult query={query}/>
  );
}
