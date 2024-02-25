import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserCaseHierarchy } from "@/app/utils";
import Table from "@/app/components/Table/Table";
import { TableStructureT } from "@/type-definitions";
import { CaseHierarchy } from "lib-empationapi/src/v3/extensions/types/case-hierarchy-result";
import { Case } from "lib-empationapi/src/v3/root/types/case";

const basePageLink = '/authorized/cases'

export default async function CaseHierarchyLevelPage({ params }: { params: { casePath?: string[] }}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  
  const relativePath = params.casePath || []

  const cases = await getUserCaseHierarchy(session)

  const currentLevel = relativePath.reduce((lastLevel, childLevelName) => {
    const invalidPathLevel = { levelName: "invalid path", lastLevel: true, items: [] }

    if (!lastLevel || lastLevel.lastLevel) {
      return invalidPathLevel;
    }
    
    const childLevel = (lastLevel.items as CaseHierarchy[]).find((childLevel) => childLevel.levelName === childLevelName)
    return childLevel || invalidPathLevel
  }, cases)

  const tableStructure: TableStructureT = {
    name: currentLevel.levelName || "All cases",
    parent: currentLevel.levelName &&  `${basePageLink}/path${relativePath.slice(0, relativePath.length - 1).reduce((path, param) => `${path}/${param}`, '')}`,
    folders: !currentLevel.lastLevel ? (currentLevel.items as CaseHierarchy[]).map((item) => {
      return { 
        name: item.levelName || "",
        link: `${basePageLink}/path${relativePath.reduce((path, param) => `${path}/${param}`, '')}/${item.levelName}`}
    }) : undefined,
    cases: currentLevel.lastLevel ? (currentLevel.items as Case[]).map((item) => {
      return { 
        name: item.local_id || item.id,
        desc: item.description || undefined,
        link: `${basePageLink}/case/${item.id}`}
    }) : undefined,
  }

  return (
    <div>
      <Table tableStructure={tableStructure}/>
    </div>
  );
}
