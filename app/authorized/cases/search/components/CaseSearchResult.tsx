'use client'

import { TableStructureT } from "@/type-definitions";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { CaseSearchParams } from "@/EmpationAPI/src/v3/extensions/types/case-search-params";
import { Case } from "@/EmpationAPI/src/v3/root/types/case";
import CaseExplorer from "@/EmpationAPI/src/v3/extensions/case-explorer";

type Props = {
  caseExplorer: CaseExplorer;
  query: CaseSearchParams[];
}

const getTableStructureFromSearchResult = (cases: Case[]) => {
  const tableStructure: TableStructureT = {
    cases: cases.map((caseObj) => {
      return { 
        name: caseObj.local_id || caseObj.id,
        desc: caseObj.description || undefined,
        link: `/authorized/cases/case/${caseObj.id}`}
    }),
    slides: [],
  }
  return tableStructure
}

export default function CaseSearchResult({ caseExplorer, query }: Props) {
  const [searchResult, setSearchResult] = useState<Case[] | undefined>()

  useEffect(() => {
    const searchCases = async () => {
      const result = await caseExplorer.search(query)
      setSearchResult(result)
    };

    if (caseExplorer && query) {
      searchCases()
    }
  }, [caseExplorer, query])

  return (
    <div>
      <div>{!searchResult ? "Loading..." : (searchResult.length > 0 ? "Search results:" : "No cases match the search")}</div>
      {searchResult && searchResult.length > 0 &&
        <Table tableStructure={getTableStructureFromSearchResult(searchResult)} />
      }
    </div>
  );
}
