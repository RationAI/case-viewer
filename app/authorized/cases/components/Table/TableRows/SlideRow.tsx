'use client'

import { SlideRowT } from "@/type-definitions";
import React from "react";
import ImagePreview from "./SlideRowParts/ImagePreview";
import SlideVisualizations from "./SlideRowParts/SlideVisualizations";
import SlideTags from "./SlideRowParts/SlideTags";
import { Slide } from "@/EmpationAPI/src/v3/root/types/slide";

type Props = {
  slideRow: SlideRowT;
};

const getSlideTags = (slide: Slide) => {
  const tags: string[] = [];
  if(slide.tissue?.mappings["EN"]){
    tags.push(slide.tissue.mappings["EN"])
  }
  if(slide.stain?.mappings["EN"]){
    tags.push(slide.stain.mappings["EN"])
  }
  return tags;
}

const SlideRow = ({ slideRow: {slide: slide, caseObj: caseObj } }: Props) => {
  const date = new Date(slide.created_at * 1000);

  return (
    <div className="block border dark:border-color-dark rounded-sm">
      <div key={slide.id} className="collapse collapse-close overflow-visible"> {/* collapse-arrow */}
        <input type="checkbox" />
        <div className="collapse-title flex flex-row gap-4 py-0 pl-0 pr-20">
          <ImagePreview modalId={"modalId" + slide.id} slideId={slide.id} />
          <div className="flex-1 flex flex-row gap-4">
            <div className="flex flex-col justify-center min-w-[15rem] flex-1 px-2">
              <p className="font-bold text-gray-800 dark:text-base-dark">{slide.local_id ?? slide.id}</p>
              <p className="">{date.toLocaleString("cs")}</p>
            </div>
            <div className="flex w-[15.5rem] items-center justify-center z-10">
              <SlideVisualizations slide={slide} caseObj={caseObj}/>
            </div>
            <SlideTags tags={getSlideTags(slide)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideRow;
