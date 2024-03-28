import { getSlideMetadata, getSlideThumbnailURL } from '@/app/utils';
import Image from "next/image";
import React, { useContext, useEffect, useState } from 'react'
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedLayout';

type Props = {
  slideId: string;
}

const SlideContent = ({ slideId }: Props) => {
  const rootApi = useContext(RootApiContext);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [slideMetadata, setSlideMetadata] = useState<object | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const thumbnailUrl = await getSlideThumbnailURL(rootApi!, slideId)
      setImageUrl(thumbnailUrl);
      const slideMetadata = await getSlideMetadata(rootApi!, slideId)
      setSlideMetadata(slideMetadata)
    };

    fetchData()
  }, [slideId, rootApi])

  return (
    <div className='flex flex-row justify-between'>
      <div className=''>
        <Image className="object-contain" src={imageUrl || '/file_icons/image_file.svg'} alt="Preview" height={500} width={500}/>
        <div>{JSON.stringify(slideMetadata)}</div>
      </div>
    </div>
  )
}

export default SlideContent