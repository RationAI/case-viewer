import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonTest from "./buttonTest";
import { getCurrentUsersCases } from "@/app/utils";

export default async function ProtectedUserPage({ params }: { params: { user: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const data = await getCurrentUsersCases(session)

  return (
    <div>
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
    </div>
  );
}