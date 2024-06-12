'use client';

import { FormConfigT, FormFieldT } from '@/type-definitions';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/Forms/Form/Form';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import { CaseTissuesStains } from '@/EmpationAPI/src/v3/extensions/case-explorer';
import { getSearchKeys } from '@/app/utils/config';

type Props = {
  identifierParts: number;
};

type FormType = {
  year: { value: string };
  month: { value: string };
  day: { value: string };
  description: { value: string };
  tissues: { value: string };
  stains: { value: string };
};

const CaseSearchForm = ({ identifierParts }: Props) => {
  const rootApi = useContext(RootApiContext);
  const [tissues, setTissues] = useState<CaseTissuesStains[]>([]);
  const [stains, setStains] = useState<CaseTissuesStains[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getTissuesStains = async () => {
      try {
        const tissueOptions = await rootApi!.cases.caseExplorer.tissues();
        const stainsOptions = await rootApi!.cases.caseExplorer.stains();
        setTissues(tissueOptions || []);
        setStains(stainsOptions || []);
      } catch (e) {
        console.log('Fetch of tissues/stains failed');
      }
    };

    if (rootApi) {
      getTissuesStains();
    }
  }, [rootApi]);

  const uploadCustomEAD = async () => {
    await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
      'b6a43f9a-83d6-45f2-b141-bd287053f8ff',
    );
    await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
      'b6a43f9a-83d6-45f2-b141-bd287053f8ff',
    );
    await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
      'b6a43f9a-83d6-45f2-b141-bd287053f8ff',
    );
    const jobEAD = {
      name: 'Prostate Cancer Detection',
      description: 'Identifies cancer in prostate tissue',
      appId: 'b6a43f9a-83d6-45f2-b141-bd287053f8ff',
      modes: {
        preprocessing: {
          inputs: {
            my_wsi: {
              _layer_loc: 'background',
              lossless: false,
            },
          },
          outputs: {
            probability_mask: {
              _layer_loc: 'shader',
              name: 'Cancer prediction',
              type: 'heatmap',
              visible: 1,
              params: {
                opacity: 0.5,
              },
            },
            background_mask: {
              _layer_loc: 'shader',
              name: 'Mask',
              type: 'heatmap',
              visible: 1,
              params: {
                threshold: 50,
                use_mode: 'mask_clip',
              },
            },
          },
        },
      },
    };
    await rootApi.rationai.globalStorage.jobConfig.createJobConfig(
      'b6a43f9a-83d6-45f2-b141-bd287053f8ff',
      jobEAD,
    );
  };

  const searchRows = [
    ['year', 'month', 'day'],
    [...new Array(identifierParts)].map((value, idx) => `id_part_${idx + 1}`),
    ['description'],
    ['tissues', 'stains'],
  ];

  const searchFields: { [key: string]: FormFieldT } = {
    year: {
      type: 'number',
      fieldID: 'year',
      label: 'Year',
      minValue: '2000',
      maxValue: '2024',
    },
    month: {
      type: 'number',
      fieldID: 'month',
      label: 'Month',
      minValue: '1',
      maxValue: '12',
    },
    day: {
      type: 'number',
      fieldID: 'day',
      label: 'Day',
      minValue: '1',
      maxValue: '31',
    },
    description: {
      type: 'text',
      fieldID: 'description',
      label: 'Description keyword',
    },
    tissues: {
      type: 'select',
      fieldID: 'tissues',
      label: 'Tissues',
      options: [''].concat(tissues.map((t) => t.locName)),
    },
    stains: {
      type: 'select',
      fieldID: 'stains',
      label: 'Stains',
      options: [''].concat(stains.map((s) => s.locName)),
    },
  };

  const allowedSearchKeys = getSearchKeys();

  const searchForm: FormConfigT = {
    title: 'Search...',
    rows: searchRows.map((row) => ({
      fields: row
        .filter((field) => allowedSearchKeys.includes(field))
        .map((field) => {
          if (field.slice(0, 8) === 'id_part_') {
            return {
              type: 'text',
              fieldID: field,
              label: field,
            };
          } else {
            return {
              ...searchFields[field],
            };
          }
        }),
    })),
  };

  const createSearchUrl = (paramNames: string[], target: FormType) => {
    return paramNames.reduce((prev, currParam) => {
      let paramValue = target[currParam as keyof FormType].value;
      if (paramValue && currParam === 'tissues') {
        paramValue =
          tissues.find((t) => t.locName === paramValue)?.name || paramValue;
      }
      if (paramValue && currParam === 'stains') {
        paramValue =
          stains.find((s) => s.locName === paramValue)?.name || paramValue;
      }
      return `${prev}${paramValue ? `/${currParam}/${paramValue}` : ''}`;
    }, '');
  };

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & FormType;

    const staticSearchParams = createSearchUrl(
      Object.keys(searchFields),
      target,
    );
    const dynamicSearchParams = createSearchUrl(searchRows[1], target);
    router.push(
      `/authorized/cases/search${dynamicSearchParams}${staticSearchParams}`,
    );
  };

  return (
    <>
      <Form config={searchForm} formID="searchForm" onSubmit={onSubmitSearch} />
      <button
        type="submit"
        form="searchForm"
        className="btn btn-outline btn-sm mt-2 font-sans"
      >
        Search
      </button>
      <button className="btn btn-outline" onClick={() => uploadCustomEAD()}>
        Save EAD
      </button>
    </>
  );
};

export default CaseSearchForm;
