'use client'

import {v4 as uuidv4} from 'uuid';
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import AnnotationPreset from './AnnotationPreset'
import APConfirmationPopUp from './AnnotationPresetParts/APConfirmationPopUp';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedLayout';
import AnnotationButtons from './AnnotationButtons';
import { AnnotPreset } from '@/EmpationAPI/src/v3/extensions/types/annot-preset';

const defaultColors = ['#005fd8', '#5af700', '#fff116', '#ff0000', '#a600ff', '#ff00ff', '#ff9b00', '#00fff3', '#018c1c', '#926100']

const AnnotationPresetGrid = () => {
  const rootApi = useContext(RootApiContext);
  const [presets, setPresets] = useState<AnnotPreset[]>([]);
  const [lastModified, setLastModified] = useState(0);
  const [currentColorIdx, setCurrentColorIdx] = useState(presets.length);
  const [deletePresetId, setDeletePresetId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAnnotPresets = async () => {
      const presetsResult = await rootApi!.rationai.globalStorage.annotPresets.getAnnotPresets();
      setPresets(presetsResult.presets);
      setLastModified(presetsResult.lastModifiedAt);
      setLoading(false);
    };

    if(rootApi) {
      getAnnotPresets();
    }
  }, [rootApi])

  const handleEditPreset = (id: string, editedPreset: AnnotPreset) => {
    const newPresets = [...presets];
    const editedIdx = newPresets.findIndex((preset) => preset.id === id);
    newPresets[editedIdx] = editedPreset;
    setPresets(newPresets);
  }

  const handleNewPreset: () => void = () => {
    const id = uuidv4();
    const currentDate = Date.now();
    setCurrentColorIdx(currentColorIdx + 1)
    const color = defaultColors[currentColorIdx % defaultColors.length]
    const newPreset: AnnotPreset = {
      id: id,
      color: color,
      factoryID: "polygon",
      presetID: "Ignore*",
      meta: {
        category: {
          name: "Category",
          value: "Ignore*",
        },  
      },
      createdAt: currentDate,
    }
    const newGroup = [...presets];
    newGroup.push(newPreset);
    setPresets(newGroup);
  }

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
    setPresets(newGroup.slice(0, oldPresetIdx + 1).concat([copiedPreset]).concat(newGroup.slice(oldPresetIdx + 1)))
  }

  const handleDeletePreset = (id: string) => {
    const newGroup = presets.filter((preset) => preset.id != id);
    setPresets(newGroup);
  }

  const handleDeletePopUpOpen = (presetId: string) => {
    setDeletePresetId(presetId);
    (document.getElementById('presetDeletePopUp') as HTMLDialogElement).showModal()
  }

  const handleRevertClick = async () => {
    (document.getElementById('revertPopUp') as HTMLDialogElement).showModal()
  }

  const handleRevert = async () => {
    if(rootApi) {
      setLoading(true);
      const refetchedPresets = await rootApi.rationai.globalStorage.annotPresets.getAnnotPresets(true);
      setPresets(refetchedPresets.presets);
      setLastModified(refetchedPresets.lastModifiedAt);
      setLoading(false);
    }
  }

  const handleSaveClick = async () => {
    (document.getElementById('savePopUp') as HTMLDialogElement).showModal()
  }

  const handleSave = async () => {
    if(rootApi) {
      setLoading(true);
      const updatedPresets = await rootApi.rationai.globalStorage.annotPresets.updateAnnotPresets(presets, lastModified);
      setPresets(updatedPresets.presets);
      setLastModified(updatedPresets.lastModifiedAt);
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center gap-2 md:w-5/6 lg:w-9/12'>
      <div className='w-full flex justify-between items-center gap-2'>
        <div className='font-sans font-semibold text-slate-500 text-2xl pl-1'>Annotations presets</div>
        <AnnotationButtons handleRevertClick={handleRevertClick} handleSaveClick={handleSaveClick}/>
      </div>
      {loading ? 
        <div>Loading...</div> :
        <div className='grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))] w-full'>
        {presets.map((annotPreset) => {
          return (
            <AnnotationPreset key={annotPreset.id} annotationPreset={annotPreset} removePresetHandler={handleDeletePopUpOpen} copyPresetHandler={handleCopyPreset} editPresetHandler={handleEditPreset} />
          )
        })}
        <div>
          <div className='flex border border-gray-400 rounded-lg p-2 border-dashed'>
            <button onClick={() => handleNewPreset()} className="btn btn-sm flex justify-start border-gray-300 bg-gray-50 hover:bg-gray-200 w-full">
              <Image src="/svg/plus.svg" alt="Remove" height={27} width={27} />
              New preset
            </button>
          </div>
        </div>
        <APConfirmationPopUp message='Confirm preset deletion:' modalId='presetDeletePopUp' onConfirm={() => handleDeletePreset(deletePresetId!)} onCancel={() => {setDeletePresetId(undefined)}}/>
        <APConfirmationPopUp message='This will revert to project presets, your local changes will be lost:' modalId='revertPopUp' onConfirm={handleRevert} onCancel={() => {}}/>
        <APConfirmationPopUp message='This will save the changes globally:' modalId='savePopUp' onConfirm={handleSave} onCancel={() => {}}/>
      </div>
      }
    </div>
  )
}

export default AnnotationPresetGrid