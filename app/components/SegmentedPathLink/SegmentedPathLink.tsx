'use client'

import React from 'react'
import Image from "next/image";
import Link from 'next/link';

type Props = {
  homelink: string,
  segments: {
    label: string,
    linkSegment: string,
  }[],
}

const SegmentedPathLink = ({ homelink, segments }: Props) => {
  return (
    <div className='flex flex-row align-middle gap-[2px]'>
      <Link href={homelink}>
        <Image src={'/svg/home.svg'} alt='Home' height={23} width={23}/>
      </Link>
      {segments.map((segment, idx, arr) => {
        return (
          <div key={segment.label + idx.toString()} className='flex flex-row gap-[2px]'>
            <p>/</p>
            <Link href={homelink + arr.slice(0, idx + 1).reduce((prev, seg) => `${prev}/${seg.linkSegment}`, "")} className='link link-hover'>
              {segment.label}
            </Link>
          </div>
        )
        })}
    </div>
  )
}

export default SegmentedPathLink