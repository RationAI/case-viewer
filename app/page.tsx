import AuthForm from "./components/Forms/AuthForm/AuthForm";

const AuthPage = async () => {
  return (
    <main className="flex flex-col gap-3">
      <AuthForm provider={process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "Default provider"} />
    </main>
  );
}

export default AuthPage