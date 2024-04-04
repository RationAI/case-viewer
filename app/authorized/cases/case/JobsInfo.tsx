'use client'

import { Job } from '@/EmpationAPI/src/v3/root/types/job';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { JobList } from '@/EmpationAPI/src/v3/scope/types/job-list';
import { getRootApi } from '@/app/utils';
import { getSession } from 'next-auth/react';

const PROCESSING_STATES = ['ASSEMBLY', 'RUNNING', 'SCHEDULED'];
const COMPLETED_STATES = ['COMPLETED'];
const ERROR_STATES = ['FAILED', 'TIMEOUT', 'ERROR', 'INCOMPLETE'];

const getJobStatus = (job: Job) => {
  if(PROCESSING_STATES.includes(job.status)) {
    return 'processing';
  }
  if(COMPLETED_STATES.includes(job.status)) {
    return 'completed';
  }
  if(ERROR_STATES.includes(job.status)) {
    return 'error';
  }
  return undefined;
}


type Props = {
  caseId: string,
  fetchDelayed: boolean;
}

const JobsInfo = ({caseId, fetchDelayed = false}: Props) => {
  const getCaseJobs = async () => {
    const session = await getSession()
    if (session && session.accessToken) {
      const root = await getRootApi(session);
      const examinations = await root.examinations.query({
        cases: [caseId],
      });
      console.log(examinations)
      await root.scopes.use(caseId);
      const jobs = await root.scopes.rawQuery('jobs') as JobList;
      console.log(jobs)
      return jobs.items as Job[];
    }
    return [];
  };

  const { isPending, isError, data: caseJobs } = useQuery({
    queryKey: [`case_${caseId}_jobs`],
    queryFn: getCaseJobs,
    refetchInterval: 1000 * 20,
    enabled: !fetchDelayed,
  })

  if (isPending) {
    return <div>Loading job info...</div>
  }

  if (isError) {
    return <div>Unable to fetch job info</div>
  }

  return (
    <div className='flex flex-col pl-3'>
      {caseJobs.map((job) => {
        const status = getJobStatus(job);
        return (
          status &&
            <div key={job.id} className='flex flex-row gap-2 items-center'>
              <div className='text-sm font-sans font-semibold text-slate-500'>{`Job ${job.id.slice(0, 5)}:`}</div>
              {status === 'processing' && 
                <div className='text-green-400 animate-pulse font-sans font-semibold text-sm'>processing</div>
              }
              {status === 'completed' && 
                <div className='text-green-800 font-sans font-semibold text-sm'>completed</div>
              }
              {status === 'error' && 
                <div className='text-red-800 font-sans font-semibold text-sm'>error</div>
              }
            </div>
        )
      })}
    </div>
  )
}

export default JobsInfo