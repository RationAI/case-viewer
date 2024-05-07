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
  const [opened, setOpened] = useState(defaultOpen);

  return (
    <li key={caseRow.id} className="max-w-full py-[2px]">
      <details open={defaultOpen} onClick={() => setOpened(!opened)} className="max-w-full *:open:after:rotate-[45deg] *:open:after:mt-[-0.5rem] *:after:rotate-[-45deg] *:after:mt-[-0.25rem] border-b-[1px] open:border-b-0 dark:border-neutral">
        <summary className="flex flex-row-reverse justify-end py-0 px-2 hover:bg-inherit active:!bg-inherit">
            <div className="truncate rounded-md px-[0.375rem] py-[0.25rem] font-sans font-semibold text-gray-800 dark:text-base-dark">{getCaseNameFromLocalID(caseRow.local_id) || caseRow.id}</div>
        </summary>
        <div className='p-1'>
          <CaseContent caseObj={caseRow as CaseH} fetchActive={opened}/>
        </div>
      </details>
    </li>
  )
}

export default CollapseCaseRow