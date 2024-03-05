'use client'

import { FormConfigT, FormFieldT } from '@/type-definitions';
import React, { useEffect, useState } from 'react'
import Form from '../Form/Form';
import { getAllStains, getAllTissues } from '@/app/utils';
import { Session } from 'next-auth';

type Props = {
  session: Session;
  identifierParts: number;
}

const CaseSearchForm = ({ session, identifierParts }: Props) => {
  const [tissues, setTissues] = useState<string[]>([])
  const [stains, setStains] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async (session: Session) => {
      const tissueOptions = await getAllTissues(session);
      const stainsOptions = await getAllStains(session);
      setTissues(tissueOptions || []);
      setStains(stainsOptions || []);
    };

    if (session?.accessToken) {
      fetchData(session)
    }
  }, [session])

  const searchRows = [
    ['year', 'month', 'day'],
    [...new Array(identifierParts)].map((value, idx) => `id_part_${idx}`),
    ['description'],
    ['tissues', 'stains'],
  ] 

  const searchFields: {[key: string]: FormFieldT} = {
    "year": {
      type: "number",
      fieldID: "year",
      label: "Year",
      minValue: "2000",
      maxValue: "2024",
    },
    "month": {
      type: "number",
      fieldID: "month",
      label: "Month",
      minValue: "1",
      maxValue: "12",
    }, 
    "day": {
      type: "number",
      fieldID: "day",
      label: "Day",
      minValue: "1",
      maxValue: "31",
    },
    "description": {
        type: "text",
        fieldID: "description",
        label: "Description keywords",
    },
    "id_part": {
      type: "text",
      fieldID: "idPart",
      label: "Identifier",
    },
    "tissues": {
      type: "select",
      fieldID: "tissues",
      label: "Tissues",
      options: tissues || [],
    },
    "stains": {
        type: "select",
        fieldID: "stains",
        label: "Stains",
        options: stains || [],
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

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      year: { value: string };
      month: { value: string };
      day: { value: string };
      description: { value: string };
      tissues: { value: string };
      stains: { value: string };
    };

    console.log(target.month.value)
  }

  return (
    <>
      <Form config={searchForm} formID="searchForm" onSubmit={onSubmitSearch} />
      <input type="submit" form="searchForm" />
    </>
  )
}

export default CaseSearchForm