import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import AuthForm from "./components/AuthForm/AuthForm";


const AuthPage = async () => {
  return (
    <main className="flex flex-col gap-3">
      <AuthForm provider={process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "Default provider"} />
    </main>
  );
}

export async function getSession() {
  const session = await getServerSession(authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()

  return providers
}

export default AuthPage