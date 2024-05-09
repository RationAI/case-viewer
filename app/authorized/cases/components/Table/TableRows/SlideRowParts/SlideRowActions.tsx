'use client';

import React from 'react';
import Image from 'next/image';
import { shallowRedirect } from '@/app/components/Redirect/Redirect';

type Props = {
  slidePath: string;
};

const SlideRowActions = ({ slidePath }: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 py-1">
      <button
        title="Slide details"
        onClick={() => {
          shallowRedirect(slidePath);
        }}
        className="btn btn-square btn-sm border-gray-300 bg-gray-50 hover:bg-gray-200"
      >
        <Image src="/svg/info.svg" alt="Slide details" height={20} width={20} />
      </button>
    </div>
  );
};

export default SlideRowActions;
