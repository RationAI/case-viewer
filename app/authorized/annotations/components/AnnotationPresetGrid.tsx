'use client';

import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import AnnotationPreset from './AnnotationPreset';
import APConfirmationPopUp from './AnnotationPresetParts/APConfirmationPopUp';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import AnnotationButtons from './AnnotationButtons';
import { AnnotPreset } from '@/EmpationAPI/src/v3/extensions/types/annot-preset';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '@/app/components/Loading/Loading';
import FetchError from '@/app/components/FetchError/FetchError';

const defaultColors = [
  '#005fd8',
  '#5af700',
  '#fff116',
  '#ff0000',
  '#a600ff',
  '#ff00ff',
  '#ff9b00',
  '#00fff3',
  '#018c1c',
  '#926100',
];

const AnnotationPresetGrid = () => {
  const queryClient = useQueryClient();

  const rootApi = useContext(RootApiContext);
  const [presets, setPresets] = useState<AnnotPreset[]>([]);
  const [lastModified, setLastModified] = useState(0);
  const [currentColorIdx, setCurrentColorIdx] = useState(presets.length);
  const [deletePresetId, setDeletePresetId] = useState<string | undefined>(
    undefined,
  );

  const getAnnotPresets = async () => {
    const presetsResult =
      await rootApi!.rationai.globalStorage.annotPresets.getAnnotPresets(true);
    setPresets(presetsResult.presets);
    setLastModified(presetsResult.lastModifiedAt);
    return {
      presets: presetsResult.presets,
      lastModifiedAt: presetsResult.lastModifiedAt,
    };
  };

  const postAnnotPresets = async () => {
    await rootApi!.rationai.globalStorage.annotPresets.updateAnnotPresets(
      presets,
      lastModified,
    );
    // TODO handle results
  };

  const { isFetching, isError, refetch } = useQuery({
    queryKey: [`annot_preset`],
    queryFn: getAnnotPresets,
    refetchInterval: Infinity,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  const mutation = useMutation({
    mutationFn: postAnnotPresets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annot_preset'] });
    },
  });

  const handleEditPreset = (id: string, editedPreset: AnnotPreset) => {
    const newPresets = [...presets];
    const editedIdx = newPresets.findIndex((preset) => preset.id === id);
    newPresets[editedIdx] = editedPreset;
    setPresets(newPresets);
  };

  const handleNewPreset: () => void = () => {
    const id = uuidv4();
    const currentDate = Date.now();
    setCurrentColorIdx(currentColorIdx + 1);
    const color = defaultColors[currentColorIdx % defaultColors.length];
    const newPreset: AnnotPreset = {
      id: id,
      color: color,
      factoryID: 'polygon',
      presetID: 'Ignore*',
      meta: {
        category: {
          name: 'Category',
          value: 'Ignore*',
        },
      },
      createdAt: currentDate,
    };
    const newGroup = [...presets];
    newGroup.push(newPreset);
    setPresets(newGroup);
  };

  const handleCopyPreset = (id: string) => {
    const currId = uuidv4();
    const currentDate = Date.now();
    const oldPresetIdx = presets.findIndex((grp) => grp.id === id);
    const copiedPreset: AnnotPreset = {
      ...presets[oldPresetIdx],
      id: currId,
      createdAt: currentDate,
    };
    const newGroup = [...presets];
    setPresets(
      newGroup
        .slice(0, oldPresetIdx + 1)
        .concat([copiedPreset])
        .concat(newGroup.slice(oldPresetIdx + 1)),
    );
  };

  const handleDeletePreset = (id: string) => {
    const newGroup = presets.filter((preset) => preset.id != id);
    setPresets(newGroup);
  };

  const handleDeletePopUpOpen = (presetId: string) => {
    setDeletePresetId(presetId);
    (
      document.getElementById('presetDeletePopUp') as HTMLDialogElement
    ).showModal();
  };

  const handleRevertClick = async () => {
    (document.getElementById('revertPopUp') as HTMLDialogElement).showModal();
  };

  const handleRevert = async () => {
    if (rootApi) {
      refetch();
    }
  };

  const handleSaveClick = async () => {
    (document.getElementById('savePopUp') as HTMLDialogElement).showModal();
  };

  const handleSave = async () => {
    // TODO handle different outcomes of save
    if (rootApi) {
      mutation.mutate();
    }
  };

  const uploadCustomEAD = async () => {
    await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
      '4e485b74-413e-477d-8e09-2c38ae57e582',
    );
    await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
      '4e485b74-413e-477d-8e09-2c38ae57e582',
    );
    await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
      '4e485b74-413e-477d-8e09-2c38ae57e582',
    );
    const jobEAD = {
      name: 'Prostate job',
      description: 'This is a description of prostate job',
      appId: '4e485b74-413e-477d-8e09-2c38ae57e582',
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
                threshold: 0.5,
                use_mode: 'mask_clip',
              },
            },
          },
        },
      },
    };
    await rootApi.rationai.globalStorage.jobConfig.createJobConfig(
      '4e485b74-413e-477d-8e09-2c38ae57e582',
      jobEAD,
    );
  };
  return (
    <div className="flex flex-col items-center gap-2 md:w-5/6 lg:w-9/12">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="dark:text-base-dark pl-1 font-sans text-2xl font-semibold text-slate-500">
          Annotations presets
        </div>
        <AnnotationButtons
          handleRevertClick={handleRevertClick}
          handleSaveClick={handleSaveClick}
        />
      </div>
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <FetchError message="Presets" />
      ) : (
        <div className="grid w-full gap-2 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))]">
          {presets.map((annotPreset) => {
            return (
              <AnnotationPreset
                key={annotPreset.id}
                annotationPreset={annotPreset}
                removePresetHandler={handleDeletePopUpOpen}
                copyPresetHandler={handleCopyPreset}
                editPresetHandler={handleEditPreset}
              />
            );
          })}
          <div>
            <div className="flex rounded-lg border border-dashed border-gray-400 p-2">
              <button
                onClick={() => handleNewPreset()}
                className="default-button-bg-border btn btn-sm flex w-full justify-start"
              >
                <Image
                  className="dark:svg-filter-dark"
                  src="/svg/plus.svg"
                  alt="Remove"
                  height={27}
                  width={27}
                />
                New preset
              </button>
            </div>
          </div>
          <button className="btn btn-outline" onClick={() => uploadCustomEAD()}>
            Save EAD
          </button>
          <APConfirmationPopUp
            message="Confirm preset deletion:"
            modalId="presetDeletePopUp"
            onConfirm={() => handleDeletePreset(deletePresetId!)}
            onCancel={() => {
              setDeletePresetId(undefined);
            }}
          />
          <APConfirmationPopUp
            message="This will revert to project presets, your local changes will be lost:"
            modalId="revertPopUp"
            onConfirm={handleRevert}
            onCancel={() => {}}
          />
          <APConfirmationPopUp
            message="This will save the changes globally:"
            modalId="savePopUp"
            onConfirm={handleSave}
            onCancel={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default AnnotationPresetGrid;
