import React from 'react'
import Image from "next/image";

type Props = {
  modalId: string;
  imageLink: string;
};

const ModalImagePreview = ({ modalId, imageLink }: Props) => {
  return (
    <dialog id={modalId} className="modal">
      <Image className="object-contain block m-auto max-h-fit max-w-fit" src={imageLink} alt="Image preview" fill/>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ModalImagePreview