import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import { getSlideVisualizations } from '@/app/utils';
import { DEFAULT_BG_CONFIG, DEFAULT_PARAMS_CONFIG } from '@/app/utils/constants';
import { openXOpat } from '@/app/utils/xOpat';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { Visualization, VisualizationConfig } from '@/type-definitions';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'

type Props = {
  slide: Slide;
  caseObj: CaseH;
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
    <div></div>
  )
}

export default SlideVisualizations