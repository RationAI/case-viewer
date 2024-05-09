import React from 'react';
import Image from 'next/image';

type Props = {
  modalId: string;
  imageLink: string;
};

const ModalImagePreview = ({ modalId, imageLink }: Props) => {
  return (
    <dialog id={modalId} className="modal">
      <Image
        className="max-h-contain m-auto block !h-min max-w-fit object-contain"
        src={imageLink}
        alt="Image preview"
        fill
      />
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalImagePreview;
