import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { TableStructureT } from "@/type-definitions";
import { getCaseSearchResult } from "@/app/utils/data";
import { createSearchQueryFromUrl, getNumberOfGroupsFromRegexString } from "@/app/utils/utilities";
import CaseSearchForm from "@/app/components/Forms/CaseSearchForm/CaseSearchForm";
import { getConfig } from "@/app/utils/config";
import Table from "../../components/Table/Table";

export default async function CaseSearchResultPage({ params }: { params: { searchQuery?: string[] } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const identifierParts = getNumberOfGroupsFromRegexString(getConfig().local_id_separator || "")

  if(!params.searchQuery) {
    return (
      <CaseSearchForm session={session} identifierParts={identifierParts}/>
    )
  }

  const query = createSearchQueryFromUrl(params.searchQuery)

  if(query === null) {
    return (
      <div>
        <div>Invalid search</div>
      </div>
    )
  }

  const cases = await getCaseSearchResult(session, query)

  const caseTableStructure: TableStructureT = {
    name: "Search results",
    cases: cases.map((caseObj) => {
      return { 
        name: caseObj.local_id,
        desc: caseObj.description || undefined,
        link: `/authorized/cases/case/${caseObj.id}`}
    }),
    slides: [],
  }

  return (
    <div>
      {cases.length > 0 ? 
        <>
          <div>Search results:</div>
          <Table tableStructure={caseTableStructure} />
        </>
        :
        <div>No cases match the search</div>
      }
    </div>
  );
}
