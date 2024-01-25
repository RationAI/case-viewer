import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProtectedUserPage({ params }: { params: { user: string } }) {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div>
      This is a protected user page of {session.user.name ?? "NO USERNAME"}.
      <br />
      You will only see this if you are authenticated.
      {JSON.stringify(session)}
    </div>
  );
}