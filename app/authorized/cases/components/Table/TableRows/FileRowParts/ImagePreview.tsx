'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import { getSlideThumbnailURL } from '@/app/utils/data';
import ModalImagePreview from '../../ModalImagePreview/ModalImagePreview';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedLayout';

type Props = {
  modalId: string;
  slideId: string;
}

const ImagePreview = ({ modalId, slideId }: Props) => {
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
    <>
      <div className="min-w-[8rem] relative z-10 overflow-hidden hover:overflow-visible rounded-l-sm hover:z-50" onClick={() => (document.getElementById(modalId) as HTMLDialogElement).showModal()}>
        <Image className="object-contain block m-auto transition-all duration-200 ease-linear hover:scale-[200%]" src={imageUrl || '/file_icons/image_file.svg'} alt="Preview" fill/>
      </div>
      <ModalImagePreview modalId={modalId} imageLink={imageUrl || '/file_icons/image_file.svg'} />
    </>
  )
}

export default ImagePreview