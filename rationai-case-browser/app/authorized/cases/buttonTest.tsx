'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { getCurrentUsersCases } from '@/app/utils'

const ButtonTest = () => {
  const { data: session } = useSession()
  const [caseList, setCaseList] = useState<object>()

  useEffect(() => {
    const fetchData = async () => {
      const caseList = await getCurrentUsersCases(session!);
      setCaseList(caseList);
    };

    if (session?.accessToken) {
      fetchData()
    }
  }, [session])

  return (
    <div>{JSON.stringify(session)} + {JSON.stringify(caseList || "")}</div>
  )
}

export default ButtonTest;