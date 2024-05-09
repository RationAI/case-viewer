import { TableStructureT } from '@/type-definitions';
import React from 'react';
import FolderRow from './TableRows/FolderRow';
import CollapseCaseRow from './TableRows/CollapseCaseRow';
import { getCaseNameFromLocalID } from '@/app/utils';

type Props = {
  tableStructure: TableStructureT;
};

const Table = ({ tableStructure }: Props) => {
  return (
    <div>
      {tableStructure.folders && (
        <div className="flex flex-col gap-1">
          {tableStructure.parent && (
            <FolderRow name=".." link={tableStructure.parent} shallow />
          )}
          {tableStructure.folders.map((folder) => (
            <FolderRow
              key={folder.link}
              name={folder.name}
              link={folder.link}
              shallow
            />
          ))}
        </div>
      )}
      {tableStructure.cases && (
        <div className="flex flex-col gap-1">
          {tableStructure.parent && (
            <FolderRow name=".." link={tableStructure.parent} shallow />
          )}
          {tableStructure.mergeCases ? (
            <>
              <ul className="menu p-0">
                {tableStructure.cases.map((c) => (
                  <CollapseCaseRow
                    key={c.id}
                    caseRow={c}
                    defaultOpen={
                      tableStructure.cases
                        ? tableStructure.cases.length <= 1
                        : false
                    }
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              {tableStructure.cases.map((c) => (
                <FolderRow
                  key={c.id}
                  name={getCaseNameFromLocalID(c.local_id) || c.id}
                  desc={c.description || undefined}
                  link={`/authorized/cases/case/${c.id}`}
                  shallow
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
