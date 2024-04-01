'use client'

import { TableStructureT } from "@/type-definitions";
import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { CaseSearchParams } from "@/EmpationAPI/src/v3/extensions/types/case-search-params";
import { Case } from "@/EmpationAPI/src/v3/root/types/case";
import { RootApiContext } from "@/app/authorized/[[...pathParts]]/AuthorizedApp";

type Props = {
  query: CaseSearchParams[];
}

const getTableStructureFromSearchResult = (cases: Case[]) => {
  const tableStructure: TableStructureT = {
    cases: cases.map((caseObj) => {
      return { 
        caseObj: caseObj,
      }
    }),
    slides: [],
  }
  return tableStructure
}

export default function CaseSearchResult({ query }: Props) {
  const rootApi = useContext(RootApiContext);

  const [searchResult, setSearchResult] = useState<Case[] | undefined>()

  useEffect(() => {
    const searchCases = async () => {
      const result = await rootApi!.cases.caseExplorer.search(query)
      setSearchResult(result)
    };

    if (rootApi && query) {
      searchCases()
    }
  }, [rootApi, query])

  return (
    <div>
      <div>{!searchResult ? "Loading..." : (searchResult.length > 0 ? "Search results:" : "No cases match the search")}</div>
      {searchResult && searchResult.length > 0 &&
        <Table tableStructure={getTableStructureFromSearchResult(searchResult)} />
      }
    </div>
  );
}
