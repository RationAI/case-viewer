import { redirect } from "next/navigation";
import AuthorizedApp from "./AuthorizedApp";
import { checkSessionOnServer } from "@/app/utils/auth";

export default async function AuthorizedPage() {
  const hasAccess = await checkSessionOnServer();
  if (!hasAccess) {
    redirect("/");
  }

  return (
    <AuthorizedApp />
  );
}