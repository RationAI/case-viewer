'use client';

import React from 'react';
import Image from 'next/image';
import Redirect from '@/app/components/Redirect/Redirect';

type Props = {
  homelink: string;
  segments: {
    label: string;
    linkSegment: string;
  }[];
};

const SegmentedPathLink = ({ homelink, segments }: Props) => {
  return (
    <div className="flex flex-row gap-[2px] align-middle">
      <Redirect link={homelink} shallow>
        <Image
          className="dark:svg-filter-dark"
          src={'/svg/home.svg'}
          alt="Home"
          height={27}
          width={27}
        />
      </Redirect>
      {segments.map((segment, idx, arr) => {
        return (
          <div
            key={segment.label + idx.toString()}
            className="flex flex-row gap-[2px]"
          >
            <p className="text-xl">/</p>
            <Redirect
              link={
                homelink +
                arr
                  .slice(0, idx + 1)
                  .reduce((prev, seg) => `${prev}/${seg.linkSegment}`, '')
              }
              className="dark:text-base-dark link-hover link font-sans text-xl font-semibold text-gray-800"
              shallow
            >
              {segment.label}
            </Redirect>
          </div>
        );
      })}
    </div>
  );
};

export default SegmentedPathLink;
