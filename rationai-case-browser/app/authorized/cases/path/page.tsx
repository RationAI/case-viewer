import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserCaseHierarchy } from "@/app/utils";
import Table from "@/app/components/Projects/Table";
import { TableStructureT } from "@/type-definitions";

export default async function RootCasesPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const cases = await getUserCaseHierarchy(session)

  const caseTableStructure: TableStructureT = {
    name: "All cases",
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
      <div>Cases of user: {session.userId}</div>
      <Table tableStructure={caseTableStructure}/>
    </div>
  );
}

/* <div>
      This is a protected user page of {session.user.name ?? "NO USERNAME"}.
      <br />
      You will only see this if you are authenticated.
      {JSON.stringify(session)}
      <br />
      <br />
      {"Data: " + JSON.stringify(data)}
      <br />
      <br />
      <ButtonTest />
    </div> */