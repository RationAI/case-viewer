import { TableCaseRowT } from '@/type-definitions'
import React from 'react'
import CaseContent from '../../../case/CaseContent';

type Props = {
  caseRow: TableCaseRowT;
}

const CollapseCaseRow = ({ caseRow }: Props) => {
  return (
    <li key={caseRow.link} className="max-w-full truncate py-[2px]">
      <details open className="max-w-full *:open:after:rotate-[-135deg] border-b-[1px]">
        <summary className="flex flex-row-reverse justify-end py-0 px-2 active:!bg-white hover:bg-white">
            <div className="truncate rounded-md px-[0.375rem] py-[0.25rem] font-sans font-semibold text-gray-800">{caseRow.name}</div>
        </summary>
        <div className='p-1'>
          <CaseContent caseId={caseRow.caseId} showCaseName={false} />
        </div>
      </details>
    </li>
  )
}

export default CollapseCaseRow