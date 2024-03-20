'use client'

import { TableStructureT } from "@/type-definitions";
import { CaseHierarchy } from "@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result";
import { Case } from "@/EmpationAPI/src/v3/root/types/case"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Table from "../components/Table/Table";
import SegmentedPathLink from "../components/SegmentedPathLink/SegmentedPathLink";
import { getPathParts } from "@/app/utils";

const basePageLink = '/authorized/cases'

type Props = {
  caseHierarchy: CaseHierarchy;
}

const getCurrentLevelFromHierarchy = (hierarchy: CaseHierarchy, relativePath: string[]) => {
  const currLvl = relativePath.reduce((lastLevel, childLevelName) => {
    const invalidPathLevel: CaseHierarchy = { levelName: "invalid path", lastLevel: true, items: [] }

    if (!lastLevel || lastLevel.lastLevel) {
      return invalidPathLevel;
    }
    
    const childLevel = (lastLevel.items as CaseHierarchy[]).find((childLevel) => childLevel.levelName === childLevelName)
    return childLevel || invalidPathLevel
  }, hierarchy)
  return currLvl;
}

const getTableStructureFromLevel = (currLvl: CaseHierarchy, relativePath: string[]) => {
  const tableStructure: TableStructureT = {
    name: !currLvl.levelName ? "All cases" : undefined,
    parent: currLvl.levelName &&  `${basePageLink}/path${relativePath.slice(0, relativePath.length - 1).reduce((path, param) => `${path}/${param}`, '')}`,
    folders: !currLvl.lastLevel ? (currLvl.items as CaseHierarchy[]).map((item) => {
      return { 
        name: item.levelName || "",
        link: `${basePageLink}/path${relativePath.reduce((path, param) => `${path}/${param}`, '')}/${item.levelName}`}
    }) : undefined,
    cases: currLvl.lastLevel ? (currLvl.items as Case[]).map((item) => {
      return { 
        name: item.local_id || item.id,
        desc: item.description || undefined,
        link: `${basePageLink}/case/${item.id}`}
    }) : undefined,
  }
  return tableStructure
}

export default function CaseHierarchyLevel({ caseHierarchy }: Props) {
  const [currentLevel, setCurrentLevel] = useState<CaseHierarchy | undefined>();

  const relativePath = usePathname();

  useEffect(() => {
    const getCurrentLevel = async (hierarchy: CaseHierarchy) => {
      const currLvl = getCurrentLevelFromHierarchy(hierarchy, getPathParts(relativePath))
      setCurrentLevel(currLvl);
    };

    if (caseHierarchy) {
      getCurrentLevel(caseHierarchy)
    }
  }, [caseHierarchy, relativePath])

  return (
    <div className="flex flex-col gap-4 p-1">
      {getPathParts(relativePath).length > 0 &&
        <SegmentedPathLink homelink="/authorized/cases/path" segments={getPathParts(relativePath).map((part) => ({label: part, linkSegment: part}))} />
      }
      {currentLevel ? 
        <Table tableStructure={getTableStructureFromLevel(currentLevel, getPathParts(relativePath))}/> :
        <div>Loading...</div>
      }
    </div>
  );
}
