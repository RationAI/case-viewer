'use client'

import { TableStructureT } from "@/type-definitions";
import { CaseHierarchy } from "@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Table from "../components/Table/Table";
import SegmentedPathLink from "../components/SegmentedPathLink/SegmentedPathLink";
import { getPathParts } from "@/app/utils";
import { CaseH } from "@/EmpationAPI/src/v3/extensions/types/case-h";
import Loading from "@/app/components/Loading/Loading";

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
    parent: currLvl.levelName &&  `${basePageLink}/path${relativePath.slice(0, relativePath.length - 1).reduce((path, param) => `${path}/${param}`, '')}`,
    folders: !currLvl.lastLevel ? (currLvl.items as CaseHierarchy[]).map((item) => {
      return { 
        name: item.levelName || "",
        link: `${basePageLink}/path${relativePath.reduce((path, param) => `${path}/${param}`, '')}/${item.levelName}`}
    }) : undefined,
    cases: currLvl.lastLevel ? (currLvl.items as CaseH[]).map((item) => {
      return item;
    }) : undefined,
    mergeCases: true,
  }
  return tableStructure
}

export default function CaseHierarchyLevel({ caseHierarchy }: Props) {
  const [currentLevel, setCurrentLevel] = useState<CaseHierarchy | undefined>();

  const relativePath = usePathname();

  useEffect(() => {
    const getCurrentLevel = async (hierarchy: CaseHierarchy) => {
      const currLvl = getCurrentLevelFromHierarchy(hierarchy, getPathParts(relativePath, 3))
      setCurrentLevel(currLvl);
    };

    if (caseHierarchy) {
      getCurrentLevel(caseHierarchy)
    }
  }, [caseHierarchy, relativePath])

  return (
    <div className="flex flex-col gap-4 p-1">
      {getPathParts(relativePath, 3).length > 0 ?
        <SegmentedPathLink homelink="/authorized/cases/path" segments={getPathParts(relativePath, 3).map((part) => ({label: part, linkSegment: part}))} /> :
        <div className="font-sans font-semibold text-slate-500 text-xl pl-1 dark:text-base-dark">All cases</div>
      }
      {currentLevel ? 
        <Table tableStructure={getTableStructureFromLevel(currentLevel, getPathParts(relativePath, 3))}/> :
        <Loading />
      }
    </div>
  );
}
