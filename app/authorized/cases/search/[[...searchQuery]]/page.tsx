import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { createSearchQueryFromUrl, getNumberOfGroupsFromRegexString } from "@/app/utils/utilities";
import { getConfig } from "@/app/utils/config";
import CaseSearchForm from "./components/CaseSearchForm";
import CaseSearchResult from "./components/CaseSearchResult";

export default async function CaseSearchResultPage({ params }: { params: { searchQuery?: string[] } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const identifierParts = getNumberOfGroupsFromRegexString(getConfig().local_id_separator || "")

  if(!params.searchQuery) {
    return (
      <CaseSearchForm identifierParts={identifierParts}/>
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
  return (
    <CaseSearchResult query={query}/>
  );
}
