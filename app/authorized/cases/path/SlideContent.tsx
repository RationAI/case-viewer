import { getSlideThumbnailURL } from '@/app/utils';
import Image from "next/image";
import React, { useContext, useEffect, useState } from 'react'
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedLayout';

type Props = {
  slideId: string;
}

const SlideContent = ({ slideId }: Props) => {
  const rootApi = useContext(RootApiContext);
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const thumbnailUrl = await getSlideThumbnailURL(rootApi!, slideId)
      setImageUrl(thumbnailUrl);
    };

    fetchData()
  }, [slideId, rootApi])

  return (
    <div className='flex flex-row justify-between'>
      <div>
        <Image className="object-contain block m-auto transition-all duration-200 ease-linear hover:scale-[200%]" src={imageUrl || '/file_icons/image_file.svg'} alt="Preview" fill/>
      </div>
    </div>
  )
}

export default SlideContent