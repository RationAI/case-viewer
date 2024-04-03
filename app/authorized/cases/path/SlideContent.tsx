import { getSlideMetadata, getSlideThumbnail } from '@/app/utils';
import Image from "next/image";
import React, { useContext, useEffect } from 'react'
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';

type Props = {
  slideId: string;
}

const SlideContent = ({ slideId }: Props) => {
  const rootApi = useContext(RootApiContext);

  const getSlideInfo = async () => {
    const thumbnail = await getSlideThumbnail(rootApi!, slideId)
    const slideMetadata = await getSlideMetadata(rootApi!, slideId)
    return {thumbnailUrl: thumbnail ? URL.createObjectURL(thumbnail) : undefined, metadata: slideMetadata}
  };

  const { isPending, isError, data } = useQuery({
    queryKey: [`slide_${slideId}_info`],
    queryFn: getSlideInfo,
  })

  useEffect(() => {
    // returned function will be called on component unmount 
    return () => {
      if(data?.thumbnailUrl) {
        URL.revokeObjectURL(data.thumbnailUrl)};
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Unable to fetch slide</div>
  }

  return (
    <div className='flex flex-row justify-between'>
      <div className=''>
        <Image className="object-contain" src={data.thumbnailUrl || '/file_icons/image_file.svg'} alt="Preview" height={500} width={500} />
        <div>{JSON.stringify(data.metadata)}</div>
      </div>
    </div>
  )
}

export default SlideContent