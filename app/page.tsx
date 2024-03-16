import AuthForm from "./components/Forms/AuthForm/AuthForm";
import SegmentedPathLink from "./components/SegmentedPathLink/SegmentedPathLink";


const AuthPage = async () => {
  return (
    <main className="flex flex-col gap-3">
      <SegmentedPathLink homelink="/authorized/cases/path" segments={[{label: "one", linkSegment: "one"}, {label: "two", linkSegment: "two"}]} />
      <AuthForm provider={process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "Default provider"} />
    </main>
  );
}

export default AuthPage