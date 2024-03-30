'use client'

import {v4 as uuidv4} from 'uuid';
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import AnnotationPreset from './AnnotationPreset'
import { AnnotationPresetT } from '@/type-definitions'
import APConfirmationPopUp from './AnnotationPresetParts/APConfirmationPopUp';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedLayout';
import AnnotationButtons from './AnnotationButtons';

const defaultColors = ['#005fd8', '#5af700', '#fff116', '#ff0000', '#a600ff', '#ff00ff', '#ff9b00', '#00fff3', '#018c1c', '#926100']

/* const presetsExample: AnnotationPresetT[] = [
  {
    "id": "0",
    "color": "#003fff",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },
      "k1700645671744": {
        "name": "cancer",
        "value": "ano"
      },
      "k1700645680488": {
        "name": "no cancer",
        "value": "neco"
      }
    },
  },
  {
    "id": "1",
    "color": "#7f00ff",
    "factoryID": "rectangle",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
  {
    "id": "2",
    "color": "#ff0000",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
  {
    "id": "3",
    "color": "#7fff00",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
  {
    "id": "4",
    "color": "#ffbf00",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
  {
    "id": "5",
    "color": "#ffbf00",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
  {
    "id": "6",
    "color": "#ffbf00",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
  {
    "id": "7",
    "color": "#ffbf00",
    "factoryID": "polygon",
    "presetID": "Ignore*",
    "meta": {
      "category": {
        "name": "Category",
        "value": "Ignore*"
      },  
    },
  },
] */

const AnnotationPresetGrid = () => {
  const rootApi = useContext(RootApiContext);
  const [presets, setPresets] = useState<AnnotationPresetT[]>([]);
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

  const handleEditPreset = (id: string, editedPreset: AnnotationPresetT) => {
    const newPresets = [...presets];
    const editedIdx = newPresets.findIndex((preset) => preset.id === id);
    newPresets[editedIdx] = editedPreset;
    // console.log(newPresets)
    setPresets(newPresets);
  }

  const handleNewPreset: () => void = () => {
    const id = uuidv4();
    setCurrentColorIdx(currentColorIdx + 1)
    const color = defaultColors[currentColorIdx % defaultColors.length]
    const newPreset = {
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
    }
    const newGroup = [...presets];
    newGroup.push(newPreset);
    setPresets(newGroup);
  }

  const handleCopyPreset = (id: string) => {
    const currId = uuidv4();
    const oldPresetIdx = presets.findIndex((grp) => grp.id === id);
    const copiedPreset: AnnotationPresetT = {
      ...presets[oldPresetIdx],
      id: currId,
    };
    const newGroup = [...presets];
    setPresets(newGroup.slice(0, oldPresetIdx).concat([copiedPreset]).concat(newGroup.slice(oldPresetIdx)))
  }

  const handleRemovePreset = (id: string) => {
    const newGroup = presets.filter((preset) => preset.id != id);
    setPresets(newGroup);
  }

  const handlePopUpOpen = (presetId: string) => {
    setDeletePresetId(presetId);
    (document.getElementById('annotPopUp') as HTMLDialogElement).showModal()
  }

  const handleRevertClick = async () => {
    if(rootApi) {
      setLoading(true);
      const refetchedPresets = await rootApi.rationai.globalStorage.annotPresets.getAnnotPresets(true);
      setPresets(refetchedPresets.presets);
      setLastModified(refetchedPresets.lastModifiedAt);
      setLoading(false);
    }
  }

  const handleSaveClick = async () => {
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
            <AnnotationPreset key={annotPreset.id} annotationPreset={annotPreset} removePresetHandler={handlePopUpOpen} copyPresetHandler={handleCopyPreset} editPresetHandler={handleEditPreset} />
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
        <APConfirmationPopUp presetId={deletePresetId!} modalId='annotPopUp' onConfirm={handleRemovePreset} onCancel={() => {setDeletePresetId(undefined)}}/>
      </div>
      }
    </div>
  )
}

export default AnnotationPresetGrid