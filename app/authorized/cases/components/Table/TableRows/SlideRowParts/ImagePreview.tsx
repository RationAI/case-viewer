'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { getSlideThumbnail } from '@/app/utils/data';
import ModalImagePreview from '../../ModalImagePreview/ModalImagePreview';
import { RootApiContext } from '@/app/authorized/[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';

type Props = {
  modalId: string;
  slideId: string;
};

const ImagePreview = ({ modalId, slideId }: Props) => {
  const rootApi = useContext(RootApiContext);

  const getThumbnailURL = async () => {
    const thumbnail = await getSlideThumbnail(rootApi!, slideId);
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  };

  const { data } = useQuery({
    queryKey: [`slide_${slideId}_thumbnail`],
    queryFn: getThumbnailURL,
  });

  return (
    <>
      <div
        className="relative z-10 min-w-[8rem] overflow-hidden rounded-l-sm hover:z-50 hover:overflow-visible"
        onClick={() =>
          data
            ? (
                document.getElementById(modalId) as HTMLDialogElement
              ).showModal()
            : {}
        }
      >
        <Image
          className={`m-auto block object-contain ${data ? 'transition-all duration-200 ease-linear hover:scale-[200%] ' : 'dark:svg-filter-dark opacity-30'}`}
          src={data || '/file_icons/image_file.svg'}
          alt="Preview"
          fill
        />
      </div>
      <ModalImagePreview
        modalId={modalId}
        imageLink={data || '/file_icons/image_file.svg'}
      />
    </>
  );
};

export default ImagePreview;
