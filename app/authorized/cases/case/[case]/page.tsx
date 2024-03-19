import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import CaseContent from './components/CaseContent';

const CasePage= async ({ params }: { params: { case: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <CaseContent caseId={params.case}/>
  )
}

export default CasePage