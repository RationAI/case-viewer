import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import { getSlideVisualizations } from '@/app/utils';
import { DEFAULT_BG_CONFIG, DEFAULT_PARAMS_CONFIG } from '@/app/utils/constants';
import { openXOpat } from '@/app/utils/xOpat';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { Visualization, VisualizationConfig } from '@/type-definitions';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import Image from "next/image";

type Props = {
  slide: Slide;
  caseObj: CaseH;
}

const markVisVisited = (event, href: string) => {
  event.preventDefault();
  if (history.replaceState) {
    const current_url = window.location.href;
    history.replaceState({},'',href);
    history.replaceState({},'',current_url);
  }
}

const handleOpenInXOpat = (data: string[], visualization: Visualization) => {
  const xOpatVisualizationConfig: VisualizationConfig = { 
    params: DEFAULT_PARAMS_CONFIG,
    background: DEFAULT_BG_CONFIG,
    data: data,
    visualizations: [visualization]
  }

  if(xOpatVisualizationConfig) {
    openXOpat(xOpatVisualizationConfig);
    console.log("Opening xOpat with visualization:" + JSON.stringify(xOpatVisualizationConfig));
    return;
  }

  console.log(JSON.stringify("No visualization, cannot open xOpat"))
}

const SlideVisualizations = ({slide, caseObj}: Props) => {
  const rootApi = useContext(RootApiContext);

  const getAllSlideVisualizations = async () => {
    const rationaiApi = rootApi!.rationai;
    const userVis = await getSlideVisualizations(slide.id, rationaiApi);
    
    return {userVis: userVis}
  };

  const { isPending, isError, data } = useQuery({
    queryKey: [`case_${caseObj.id}_content`],
    queryFn: getAllSlideVisualizations,
    enabled: rootApi !== undefined,
  })

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-row gap-1 w-full'>
        
        <a href={"temp"} className="group relative flex justify-center" onClick={(e) => markVisVisited(e, "temp")}>
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-sm group-visited:bg-purple-200 group-visited:border-purple-400 bg-green-500 hover:bg-green-500 btn-square border-green-600 hover:border-green-600"
          >
            <Image className='' src="/svg/layer.svg" alt="Slide details" height={20} width={20} />
          </button>
          <div className="w-max absolute bottom-9 scale-0 transition-all rounded border border-gray-500 bg-white p-[2px] group-hover:scale-100">
            <span className='text-xs'>{"Job "}</span>
            <span className='text-xs text-green-500 font-semibold'>completed</span>
          </div>
        </a>
        <div className="group relative flex justify-center">
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-sm !bg-lime-100 btn-disabled btn-square !border-lime-300 animate-pulse"
          >
            <Image className='animate-spin opacity-30' src="/svg/loader2.svg" alt="Slide details" height={20} width={20} />
          </button>
          <div className="w-max absolute bottom-9 scale-0 transition-all rounded border border-gray-500 bg-white p-[2px] group-hover:scale-100">
            <span className='text-xs'>{"Job "}</span>
            <span className='text-xs text-lime-500 font-semibold animate-pulse'>processing...</span>
          </div>
        </div>
        <div className="group relative flex justify-center">
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-sm btn-square border-gray-300 bg-gray-50 hover:bg-gray-50"
          >
            bg
          </button>
          <div className="w-max absolute bottom-9 scale-0 transition-all rounded border border-gray-500 bg-white p-[2px] group-hover:scale-100">
            <span className='text-xs'>Open slide only</span>
          </div>
        </div>
      </div>
      {/* <div className='flex flex-row gap-1 w-full'>
        <button
          title="Job output"
          onClick={() => {}}
          className="btn btn-sm !bg-green-500 !border--300"
        >
          <Image className='' src="/svg/layer.svg" alt="Slide details" height={20} width={20} />
          Test
        </button>

        <button
          title="Job output"
          onClick={() => {}}
          className="btn btn-sm !bg-lime-100 btn-disabled !border-lime-300 animate-pulse"
        >
          <Image className='animate-spin opacity-30' src="/svg/loader2.svg" alt="Slide details" height={20} width={20} />
          test
        </button>
      </div> */}
    </div>
  )
}

export default SlideVisualizations