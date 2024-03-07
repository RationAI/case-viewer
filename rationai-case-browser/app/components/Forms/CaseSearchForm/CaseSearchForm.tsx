'use client'

import { FormConfigT, FormFieldT } from '@/type-definitions';
import React, { useEffect, useState } from 'react'
import Form from '../Form/Form';
import { getAllStains, getAllTissues } from '@/app/utils';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

type Props = {
  session: Session;
  identifierParts: number;
}

type FormType = {
  year: { value: string };
  month: { value: string };
  day: { value: string };
  description: { value: string };
  tissues: { value: string };
  stains: { value: string };
};

const createSearchUrl = (paramNames: string[], target: FormType) => {
  return paramNames.reduce((prev, currParam) => {
    const paramValue = target[currParam as keyof FormType].value;
    return `${prev}${paramValue ? `/${currParam}/${paramValue}` : ''}`
  }, '');
}

const CaseSearchForm = ({ session, identifierParts }: Props) => {
  const [tissues, setTissues] = useState<string[]>([])
  const [stains, setStains] = useState<string[]>([])

  const router = useRouter()

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
    [...new Array(identifierParts)].map((value, idx) => `id_part_${idx + 1}`),
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
        label: "Description keyword",
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
              type: "text",
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
    
    const target = event.target as typeof event.target & FormType;

    const staticSearchParams = createSearchUrl(Object.keys(searchFields), target)
    const dynamicSearchParams = createSearchUrl(searchRows[1], target)
    router.push(`/authorized/cases/search${dynamicSearchParams}${staticSearchParams}`)
  }

  return (
    <>
      <Form config={searchForm} formID="searchForm" onSubmit={onSubmitSearch} />
      <button type="submit" form="searchForm" className='btn btn-sm btn-outline font-sans mt-2'>Search</button>
    </>
  )
}

export default CaseSearchForm