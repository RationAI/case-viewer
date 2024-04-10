import React, { useState } from 'react'
import CaseContent from '../../../case/CaseContent';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { getCaseNameFromLocalID } from '@/app/utils';

type Props = {
  caseRow: Case | CaseH;
  defaultOpen: boolean;
}

const CollapseCaseRow = ({ caseRow, defaultOpen }: Props) => {
  const [openedOnce, setOpenedOnce] = useState(defaultOpen);

  return (
    <li key={caseRow.id} className="max-w-full truncate py-[2px]">
      <details open={defaultOpen} onClick={() => setOpenedOnce(true)} className="max-w-full *:open:after:rotate-[45deg] *:open:after:mt-[-0.5rem] *:after:rotate-[-45deg] *:after:mt-[-0.25rem] border-b-[1px] open:border-b-0">
        <summary className="flex flex-row-reverse justify-end py-0 px-2 active:!bg-white hover:bg-white">
            <div className="truncate rounded-md px-[0.375rem] py-[0.25rem] font-sans font-semibold text-gray-800">{getCaseNameFromLocalID(caseRow.local_id) || caseRow.id}</div>
        </summary>
        <div className='p-1'>
          <CaseContent caseObj={caseRow as CaseH} fetchDelayed={!openedOnce}/>
        </div>
      </details>
    </li>
  )
}

export default CollapseCaseRow