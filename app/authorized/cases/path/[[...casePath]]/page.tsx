import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CaseHierarchyLevel from "./components/CaseHierarchyLevel";

export default async function CaseHierarchyPage({ params }: { params: { casePath?: string[] }}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <CaseHierarchyLevel />
  );
}
