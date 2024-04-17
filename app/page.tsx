import AuthForm from "./components/Forms/AuthForm/AuthForm";
import { redirect } from "next/navigation";
import { checkSessionOnServer } from "./utils/auth";

const WelcomePage = async () => {
  const hasAccess = await checkSessionOnServer();
  if (hasAccess) {
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