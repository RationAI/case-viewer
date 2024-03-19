'use client'

import { TableStructureT } from "@/type-definitions";
import { getCaseSearchResult } from "@/app/utils/data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import { CaseSearchParams } from "@/EmpationAPI/src/v3/extensions/types/case-search-params";
import { Session } from "next-auth";
import { Case } from "@/EmpationAPI/src/v3/root/types/case";

type Props = {
  query: CaseSearchParams[];
}

const getTableStructureFromSearchResult = (cases: Case[]) => {
  const tableStructure: TableStructureT = {
    cases: cases.map((caseObj) => {
      return { 
        name: caseObj.local_id,
        desc: caseObj.description || undefined,
        link: `/authorized/cases/case/${caseObj.id}`}
    }),
    slides: [],
  }
  return tableStructure
}

export default function CaseSearchResult({ query }: Props) {
  const { data: session } = useSession();

  const [searchResult, setSearchResult] = useState<Case[] | undefined>()

  useEffect(() => {
    const searchCases = async (session: Session) => {
      const result = await getCaseSearchResult(session, query)
      setSearchResult(result)
    };

    if (session?.accessToken) {
      searchCases(session)
    }
  }, [session, query])

  return (
    <div>
      <div>{!searchResult ? "Loading..." : (searchResult.length > 0 ? "Search results:" : "No cases match the search")}</div>
      {searchResult && searchResult.length > 0 &&
        <Table tableStructure={getTableStructureFromSearchResult(searchResult)} />
      }
    </div>
  );
}
