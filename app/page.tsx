import AuthForm from "./components/Forms/AuthForm/AuthForm";

const WelcomePage = async () => {
  return (
    <main className="flex flex-row justify-center">
      <div className="flex flex-col gap-3 items-center">
        <div className="font-sans font-semibold text-slate-500 text-xl">Welcome to the RationAI Case Browser</div>
        <AuthForm provider={process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "Default provider"} />
      </div>
    </main>
  );
}

export default WelcomePage