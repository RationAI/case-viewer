import { getServerSession } from "next-auth";
import AuthForm from "./components/Forms/AuthForm/AuthForm";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

const WelcomePage = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    redirect("/authorized/cases/path");
  }

  return (
    <main className="flex flex-row justify-center w-full">
      <div className="flex flex-col gap-3 items-center pt-16">
        <div className="font-sans font-semibold text-slate-500 text-xl">Welcome to the RationAI Case Browser</div>
        <AuthForm provider={process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "Default provider"} />
      </div>
    </main>
  );
}

export default WelcomePage