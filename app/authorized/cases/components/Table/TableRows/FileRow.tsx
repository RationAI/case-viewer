'use client'

import { TableSlideRowT, VisualizationConfig } from "@/type-definitions";
import React from "react";
import ImageGrid from "./FileRowParts/ImageGrid";
import FileRowActions from "./FileRowParts/FileRowActions";
import FileRowSelect from "./FileRowParts/FileRowSelect";
import ImagePreview from "./FileRowParts/ImagePreview";
import { openXOpat } from "@/app/utils/xOpat";

type Props = {
  slide: TableSlideRowT;
  rowNo: number;
};

const handleOpenInXOpat = (event: React.FormEvent<HTMLFormElement>, slide: TableSlideRowT) => {
  event.preventDefault()
  const target = event.target as typeof event.target & {
    visName: { value: string };
  };

  const chosenVis = slide.visualizationConfig.visualizations.find((vis) => vis.name === target.visName.value)

  const xOpatVisualizationConfig: VisualizationConfig = { 
    ...slide.visualizationConfig,
    visualizations: [chosenVis!]
  }

  if(xOpatVisualizationConfig) {
    openXOpat(xOpatVisualizationConfig);
    console.log("Opening xOpat with visualization:" + JSON.stringify(xOpatVisualizationConfig));
    return;
  }

  console.log(JSON.stringify("No visualization, cannot open xOpat"))
}

const FileRow = ({ slide, rowNo }: Props) => {

  return (
    <div key={slide.slideId} className="collapse bg-gray-100 collapse-arrow rounded-sm overflow-visible">
      <input type="checkbox" />
      <div className="collapse-title flex flex-row gap-4 py-0 pl-0">
        <ImagePreview modalId={"modalId" + slide.slideId} slideId={slide.slideId} />
        <form className="flex-1 flex flex-row gap-4" onSubmit={(e) => handleOpenInXOpat(e, slide)}>
          <div className="flex flex-col justify-center min-w-[18rem] flex-1 px-2">
            <p className="font-bold">{slide.name}</p>
            <p className="">{slide.created}</p>
          </div>
          {slide.masks &&
            <div className="flex w-[12.5rem] items-center justify-center z-10">
              <FileRowSelect options={slide.masks.map((mask) => mask.name)}/>
            </div>
          }
          {slide.annotations &&
            <div className="flex items-center justify-center z-10 px-[0.375rem]">
              <ImageGrid
                images={slide.annotations}
                count={9}
                typeName="annotation"
                rowNo={rowNo}
              />
            </div>
          }
          {slide.visualizationConfig &&
            <div className="flex w-[12.5rem] items-center justify-center z-10">
              <FileRowSelect options={slide.visualizationConfig.visualizations.map((vis) => vis.name)} />
            </div>
          }
          <div className="w-16 z-10">
            <FileRowActions />
          </div>
        </form>
      </div>
      <div className="collapse-content px-2">
        <div className="pt-2">
          {Object.entries(slide.metadata).map(([key, value]) => (
            <div key={key} className="flex gap-1">
              <p className="font-medium">{key + ":"}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileRow;
