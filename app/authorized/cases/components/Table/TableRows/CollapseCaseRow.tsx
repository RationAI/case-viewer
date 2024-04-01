import { TableCaseRowT } from '@/type-definitions'
import React, { useState } from 'react'
import CaseContent from '../../../case/CaseContent';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';

type Props = {
  caseRow: TableCaseRowT;
  defaultOpen: boolean;
}

const CollapseCaseRow = ({ caseRow, defaultOpen }: Props) => {
  const [openedOnce, setOpenedOnce] = useState(false);

  return (
    <li key={caseRow.caseObj.id} className="max-w-full truncate py-[2px]">
      <details open={defaultOpen} onClick={() => setOpenedOnce(true)} className="max-w-full *:open:after:rotate-[45deg] *:open:after:mt-[-0.5rem] *:after:rotate-[-45deg] *:after:mt-[-0.25rem] border-b-[1px]">
        <summary className="flex flex-row-reverse justify-end py-0 px-2 active:!bg-white hover:bg-white">
            <div className="truncate rounded-md px-[0.375rem] py-[0.25rem] font-sans font-semibold text-gray-800">{caseRow.caseObj.local_id || caseRow.caseObj.id}</div>
        </summary>
        <div className='p-1'>
          <CaseContent caseObj={caseRow.caseObj as CaseH} showCaseName={false} basePath="/authorized/cases/path" fetchDelayed={!openedOnce}/>
        </div>
      </details>
    </li>
  )
}

export default CollapseCaseRow