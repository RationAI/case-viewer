'use client'

import React, { useState } from 'react'
import Image from "next/image";
import AnnotationPreset from './AnnotationPreset'
import { AnnotationPresetT } from '@/type-definitions'
import APConfirmationPopUp from './AnnotationPresetParts/APConfirmationPopUp';

const defaultColors = ['#005fd8', '#5af700', '#fff116', '#ff0000', '#a600ff', '#ff00ff', '#ff9b00', '#00fff3', '#018c1c', '#926100']

const presetGroupExample: AnnotationPresetT[] = [
  {
    "id": 0,
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
    "id": 1,
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
    "id": 2,
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
    "id": 3,
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
    "id": 4,
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
    "id": 5,
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
    "id": 6,
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
    "id": 7,
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
]

const AnnotationPresetGrid = () => {
  const [presetGroup, setPresetGroup] = useState<AnnotationPresetT[]>(presetGroupExample)
  const [presetIdCurrent, setPresetIdCurrent] = useState(presetGroup.length)
  const [deletePresetId, setDeletePresetId] = useState<number | undefined>(undefined)

  const handleEditPreset = (id: number, editedPreset: AnnotationPresetT) => {
    const newGroup = [...presetGroup];
    const editedIdx = newGroup.findIndex((preset) => preset.id === id);
    newGroup[editedIdx] = editedPreset;
    // console.log(newGroup)
    setPresetGroup(newGroup);
  }

  const handleNewPreset: () => void = () => {
    const id = presetIdCurrent;
    setPresetIdCurrent(presetIdCurrent + 1)
    const color = defaultColors[presetIdCurrent % defaultColors.length]
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
    const newGroup = [...presetGroup];
    newGroup.push(newPreset);
    setPresetGroup(newGroup);
  }

  const handleCopyPreset = (id: number) => {
    const currId = presetIdCurrent;
    setPresetIdCurrent(presetIdCurrent + 1)
    const oldPresetIdx = presetGroup.findIndex((grp) => grp.id === id);
    const copiedPreset: AnnotationPresetT = {
      ...presetGroup[oldPresetIdx],
      id: currId,
    };
    const newGroup = [...presetGroup];
    setPresetGroup(newGroup.slice(0, oldPresetIdx).concat([copiedPreset]).concat(newGroup.slice(oldPresetIdx)))
  }

  const handleRemovePreset = (id: number) => {
    const newGroup = presetGroup.filter((preset) => preset.id != id);
    setPresetGroup(newGroup);
  }

  const handlePopUpOpen = (presetId: number) => {
    setDeletePresetId(presetId);
    (document.getElementById('annotPopUp') as HTMLDialogElement).showModal()
  }


  return (
    <div className='grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))] w-full'>
      {presetGroup.map((annotPreset) => {
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
  )
}

export default AnnotationPresetGrid