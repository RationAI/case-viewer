import { getSlideThumbnailURL } from '@/app/utils';
import { getSession } from 'next-auth/react';
import Image from "next/image";
import React, { useEffect, useState } from 'react'

type Props = {
  slideId: string;
}

const SlideContent = ({ slideId }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session && session.accessToken) {
        const thumbnailUrl = await getSlideThumbnailURL(session, slideId)
        setImageUrl(thumbnailUrl);
      }
    };

    fetchData()
  }, [slideId])

  return (
    <div className='flex flex-row justify-between'>
      <div>
        <Image className="object-contain block m-auto transition-all duration-200 ease-linear hover:scale-[200%]" src={imageUrl || '/file_icons/image_file.svg'} alt="Preview" fill/>
      </div>
    </div>
  )
}

export default SlideContent