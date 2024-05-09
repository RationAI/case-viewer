import React from 'react'

type Props = {
  tags: string[];
}

const SlideTags = ({tags}: Props) => {
  return (
    <div className="flex flex-col justify-center gap-1 right-0 absolute items-end top-0 bottom-0 z-10">
      {tags.map((tag) => (
        <div key={tag} className="transition-max-width duration-200 ease-linear badge rounded-r-none border-slate-500 dark:border-color-dark border-r-0 max-w-20 hover:max-w-60 pr-1">
          <div className="truncate">{tag}</div>
        </div>
      ))}
    </div>
  )
}

export default SlideTags