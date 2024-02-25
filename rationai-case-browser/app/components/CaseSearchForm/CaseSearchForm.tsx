import { FormConfigT, FormFieldT } from '@/type-definitions';
import React from 'react'
import Form from '../Form/Form';
import { getAllStains, getAllTissues, getConfig, getNumberOfGroupsFromRegexString } from '@/app/utils';
import { Session } from 'next-auth';

type Props = {
  session: Session;
}

const CaseSearchForm = async ({ session }: Props) => {
  const identifier_parts = getNumberOfGroupsFromRegexString(getConfig().local_id_separator || "")

  const tissueOptions = await getAllTissues(session)
  const stainsOptions = await getAllStains(session)

  const searchRows = [
    ['year', 'month', 'day'],
    [...new Array(identifier_parts)].map((value, idx) => `id_part_${idx}`),
    ['description'],
    ['tissues', 'stains'],
  ] 

  const searchFields: {[key: string]: FormFieldT} = {
    "year": {
      type: "number",
      fieldID: "searchYear",
      label: "Year",
      minValue: "2000",
      maxValue: "2024",
    },
    "month": {
      type: "number",
      fieldID: "searchMonth",
      label: "Month",
      minValue: "1",
      maxValue: "12",
    }, 
    "day": {
      type: "number",
      fieldID: "searchDay",
      label: "Day",
      minValue: "1",
      maxValue: "31",
    },
    "description": {
        type: "text",
        fieldID: "searchDescription",
        label: "Description keywords",
    },
    "id_part": {
      type: "text",
      fieldID: "searchIdPart",
      label: "Identifier",
    },
    "tissues": {
      type: "select",
      fieldID: "searchTissues",
      label: "Tissues",
      options: tissueOptions || [],
    },
    "stains": {
        type: "select",
        fieldID: "searchStains",
        label: "Stains",
        options: stainsOptions || [],
    },
  }

  const searchForm: FormConfigT = {
    title: "Search...",
    rows: searchRows.map((row) => (
      {
        fields: row.map((field) => {
          if(field.slice(0, 8) === "id_part_") {
            return {
              ...searchFields["id_part"],
              fieldID: field,
              label: field,
            }
          } else {
            return {
              ...searchFields[field],
            }
          }
        })
      }
    ))
  };

  return (
    <Form config={searchForm} formID="searchForm" />
  )
}

export default CaseSearchForm