import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import { getSlideVisualizations } from '@/app/utils';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'

type Props = {
  slide: Slide;
  caseObj: CaseH;
}

/* const handleOpenInXOpat = (event: React.FormEvent<HTMLFormElement>, slide: TableSlideRowT) => {
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
} */

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
    <div>SlideVisualizations</div>
  )
}

export default SlideVisualizations