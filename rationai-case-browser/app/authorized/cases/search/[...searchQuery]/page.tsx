import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Table from "@/app/components/Projects/Table";
import { TableStructureT } from "@/type-definitions";
import { getCaseSearchResult } from "@/app/utils/data";
import { createSearchQueryFromUrl } from "@/app/utils/utilities";

export default async function CaseSearchResultPage({ params }: { params: { searchQuery: string[] } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const query = createSearchQueryFromUrl(params.searchQuery)

  if(query === null) {
    return (
      <div>
        <div>Invalid search URL</div>
      </div>
    )
  }

  const cases = await getCaseSearchResult(session, query)

  const caseTableStructure: TableStructureT = {
    name: "Search results",
    cases: cases.map((caseObj) => {
      return { 
        name: caseObj.id,
        desc: caseObj.description || undefined,
        link: `/authorized/cases/${caseObj.id}`}
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
