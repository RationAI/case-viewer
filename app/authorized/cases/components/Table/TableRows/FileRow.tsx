'use client'

import { SlideRow } from "@/type-definitions";
import React from "react";
import FileRowActions from "./FileRowParts/FileRowActions";
import ImagePreview from "./FileRowParts/ImagePreview";
import SlideVisualizations from "./FileRowParts/SlideVisualizations";
import { HIERARCHY_ROOT_PATH } from "@/app/utils/constants";

type Props = {
  slideRow: SlideRow;
};

const markSlideVisited = (event, href: string) => {
  console.log(href)
  event.preventDefault();
  if (history.replaceState) {
    const current_url = window.location.href;
    history.replaceState({},'',href);
    history.replaceState({},'',current_url);
  }
  // TODO fix
}

const FileRow = ({ slideRow: {slide: slide, caseObj: caseObj } }: Props) => {
  const slideHref = `/cache-${process.env.NEXT_PUBLIC_CACHE_KEY}/${slide.id}`;
  const date = new Date(slide.created_at * 1000);

  return (
    <div className="block border rounded-sm visited:border-fuchsia-500">
      <div key={slide.id} className="collapse collapse-close overflow-visible"> {/* collapse-arrow */}
        <input type="checkbox" />
        <div className="collapse-title flex flex-row gap-4 py-0 pl-0">
          <ImagePreview modalId={"modalId" + slide.id} slideId={slide.id} />
          <div className="flex-1 flex flex-row gap-4">
            <div className="flex flex-col justify-center min-w-[18rem] flex-1 px-2">
              <p className="font-bold">{slide.local_id ?? slide.id}</p>
              <p className="">{date.toLocaleString("cs")}</p>
            </div>
            <div className="flex w-[12.5rem] items-center justify-center z-10">
              <SlideVisualizations slide={slide} caseObj={caseObj}/>
            </div>
            <div className="w-16 z-10">
              <FileRowActions slidePath={`${HIERARCHY_ROOT_PATH}${caseObj.pathInHierarchy}/${slide.id}`} />
            </div>
          </div>
        </div>
        {/* {metadata && 
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
        } */}
      </div>
    </div>
  );
};

export default FileRow;

{/* <a href={slideHref} className="block border rounded-sm visited:border-fuchsia-500" onClick={(e) => markSlideVisited(e, slideHref)}>
    </a>
 */}