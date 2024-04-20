import { DEFAULT_BG_CONFIG, DEFAULT_PARAMS_CONFIG } from '@/app/utils/constants';
import { openXOpat } from '@/app/utils/xOpat';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { Visualization, VisualizationConfig } from '@/type-definitions';
import React, { useContext } from 'react'
import { ValidJobsContext } from '@/app/authorized/cases/case/CaseContent';
import BGVis from './VisButtons/BGVis';
import ProcessingVis from './VisButtons/ProcessingVis';
import AvailableVis from './VisButtons/AvailableVis';

type Props = {
  slide: Slide;
  caseObj: CaseH;
}

const handleOpenInXOpat = (data: string[], visualizations: Visualization[], background?: object, plugins?: object) => {
  const xOpatVisualizationConfig: VisualizationConfig = { 
    params: DEFAULT_PARAMS_CONFIG,
    background: background || DEFAULT_BG_CONFIG,
    data: data,
    visualizations: visualizations,
    plugins: plugins,
  }

  if(xOpatVisualizationConfig) {
    openXOpat(xOpatVisualizationConfig);
    console.log("Opening xOpat with visualization:" + JSON.stringify(xOpatVisualizationConfig));
    return;
  }

  console.log(JSON.stringify("No visualization, cannot open xOpat"))
}

const SlideVisualizations = ({slide, caseObj}: Props) => {
  const caseJobs = useContext(ValidJobsContext);

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-row gap-1 w-full'>
        {caseJobs.filter((job) => job.inputs.includes(slide.id)).map((job) => {
          if(job.status === "completed") {
            const href = `cache/${slide.id}/${job.id}`
            return  <AvailableVis 
                      key={job.id} 
                      href={href} 
                      jobName={job.name} 
                      jobDescription={job.description} 
                      onClick={() => handleOpenInXOpat([slide.id].concat(job.outputs),
                         (job.visualization ? [job.visualization] : []), 
                         job.background, 
                         {empaia: {caseId: job.caseId, appId: job.appId}}
                      )}
                    />
          } else if(job.status === "processing") {
            return <ProcessingVis key={job.id} jobName={job.name} jobDescription={job.description}/>
          }
        })}
        <BGVis tooltipText='Open only slide' onClick={() => handleOpenInXOpat([slide.id], [])}/>
      </div>
    </div>
  )
}

export default SlideVisualizations