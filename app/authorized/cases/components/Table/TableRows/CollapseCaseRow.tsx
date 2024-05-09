import React, { useState } from 'react';
import CaseContent from '../../../case/CaseContent';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { getCaseNameFromLocalID } from '@/app/utils';

type Props = {
  caseRow: Case | CaseH;
  defaultOpen: boolean;
};

const CollapseCaseRow = ({ caseRow, defaultOpen }: Props) => {
  const [opened, setOpened] = useState(defaultOpen);

  return (
    <li key={caseRow.id} className="max-w-full py-[2px]">
      <details
        open={defaultOpen}
        onClick={() => setOpened(!opened)}
        className="max-w-full border-b-[1px] *:after:mt-[-0.25rem] *:after:rotate-[-45deg] open:border-b-0 *:open:after:mt-[-0.5rem] *:open:after:rotate-[45deg] dark:border-neutral"
      >
        <summary className="flex flex-row-reverse justify-end px-2 py-0 hover:bg-inherit active:!bg-inherit">
          <div className="dark:text-base-dark truncate rounded-md px-[0.375rem] py-[0.25rem] font-sans font-semibold text-gray-800">
            {getCaseNameFromLocalID(caseRow.local_id) || caseRow.id}
          </div>
        </summary>
        <div className="p-1">
          <CaseContent caseObj={caseRow as CaseH} fetchActive={opened} />
        </div>
      </details>
    </li>
  );
};

export default CollapseCaseRow;
