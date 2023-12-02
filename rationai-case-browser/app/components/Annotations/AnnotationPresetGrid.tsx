'use client'

import React, { useState } from 'react'
import Image from "next/image";
import AnnotationPreset from './AnnotationPreset'
import { AnnotationPresetT } from '@/type-definitions'

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
        "name": "zdar more",
        "value": "ano"
      },
      "k1700645680488": {
        "name": "tyo tkáně",
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

  const handlePresetEdit = (id: number, editedPreset: AnnotationPresetT) => {
    const newGroup = [...presetGroup];
    const editedIdx = newGroup.findIndex((preset) => preset.id === id);
    newGroup[editedIdx] = editedPreset
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

  const handleRemovePreset = (id: number) => {
    const newGroup = presetGroup.filter((preset) => preset.id != id);
    setPresetGroup(newGroup);
  }


  return (
    <div className='grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(15rem,1fr))] w-full'>
      {presetGroup.map((annotPreset) => {
        return (
          <AnnotationPreset key={annotPreset.id} annotationPreset={annotPreset} removePresetHandler={handleRemovePreset} editPresetHandler={handlePresetEdit} />
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
    </div>
  )
}

export default AnnotationPresetGrid