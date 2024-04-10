'use client'
import React, { useContext } from 'react'
import Image from "next/image";
import { getSlideThumbnail } from '@/app/utils/data';
import ModalImagePreview from '../../ModalImagePreview/ModalImagePreview';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';

type Props = {
  modalId: string;
  slideId: string;
}

const ImagePreview = ({ modalId, slideId }: Props) => {
  const rootApi = useContext(RootApiContext);

  const getThumbnailURL = async () => {
    const thumbnail = await getSlideThumbnail(rootApi!, slideId)
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  };

  const { data } = useQuery({
    queryKey: [`slide_${slideId}_thumbnail`],
    queryFn: getThumbnailURL,
  })

  /* useEffect(() => {
    // returned function will be called on component unmount 
    return () => {
      if(data) {
        URL.revokeObjectURL(data)};
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) */

  return (
    <>
      <div className="min-w-[8rem] relative z-10 overflow-hidden hover:overflow-visible rounded-l-sm hover:z-50" onClick={() => data ? (document.getElementById(modalId) as HTMLDialogElement).showModal() : {}}>
        <Image className={`object-contain block m-auto ${data ? "transition-all duration-200 ease-linear hover:scale-[200%] " : "opacity-30 dark:svg-filter-dark"}`} src={data || '/file_icons/image_file.svg'} alt="Preview" fill/>
      </div>
      <ModalImagePreview modalId={modalId} imageLink={data || '/file_icons/image_file.svg'} />
    </>
  )
}

export default ImagePreview