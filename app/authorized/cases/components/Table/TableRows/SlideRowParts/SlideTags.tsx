import React from 'react';

type Props = {
  tags: string[];
};

const SlideTags = ({ tags }: Props) => {
  return (
    <div className="absolute bottom-0 right-0 top-0 z-10 flex flex-col items-end justify-center gap-1">
      {tags.map((tag) => (
        <div
          key={tag}
          className="dark:border-color-dark badge max-w-20 rounded-r-none border-r-0 border-slate-500 pr-1 transition-max-width duration-200 ease-linear hover:max-w-60"
        >
          <div className="truncate">{tag}</div>
        </div>
      ))}
    </div>
  );
};

export default SlideTags;
