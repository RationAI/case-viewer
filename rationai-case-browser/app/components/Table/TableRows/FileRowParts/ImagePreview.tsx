'use client'
import React from 'react'
import Image from "next/image";

type Props = {
  modalId: string;
  imageLink: string;
}

const ImagePreview = ({ modalId, imageLink }: Props) => {
  return (
    <div className="min-w-[8rem] relative z-10 overflow-hidden hover:overflow-visible rounded-l-lg hover:z-50" onClick={() => document.getElementById(modalId)?.showModal()}>
      <Image className="object-contain block m-auto transition-all duration-200 ease-linear hover:scale-[200%]" src={imageLink} alt="Preview" fill/>
    </div>
  )
}

export default ImagePreview