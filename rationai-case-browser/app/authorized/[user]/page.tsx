import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function ProtectedUserPage({ params }: { params: { user: string } }) {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session || !session.user) {
    redirect("/");
  }

  const data = await getData()
  console.log(data)

  return (
    <div>
      This is a protected user page of {session.user.name ?? "NO USERNAME"}.
      <br />
      You will only see this if you are authenticated.
      {JSON.stringify(session) + JSON.stringify(data)}
    </div>
  );
}