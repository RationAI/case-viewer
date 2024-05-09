import AuthForm from './components/Forms/AuthForm/AuthForm';
import { redirect } from 'next/navigation';
import { checkSessionOnServer } from './utils/auth';
import { HIERARCHY_ROOT_PATH } from './utils/constants';

const WelcomePage = async () => {
  const hasAccess = await checkSessionOnServer();
  if (hasAccess) {
    redirect(HIERARCHY_ROOT_PATH);
  }

  return (
    <main className="flex w-full flex-row justify-center">
      <div className="flex flex-col items-center gap-3 pt-16">
        <div className="font-sans text-xl font-semibold text-slate-500">
          Welcome to the RationAI Case Browser
        </div>
        <AuthForm provider="custom" />
      </div>
    </main>
  );
};

export default WelcomePage;
