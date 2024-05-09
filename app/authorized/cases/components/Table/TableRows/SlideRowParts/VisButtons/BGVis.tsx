import React from 'react';
import { markVisited } from '../SlideVisualizations';

type Props = {
  tooltipText?: string;
  href: string;
  onClick: () => void;
};

const BGVis = ({ tooltipText, href, onClick }: Props) => {
  return (
    <a
      href={href}
      className="group relative flex justify-center"
      onClick={(e) => markVisited(e, href)}
    >
      <div className="group relative flex justify-center">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-square btn-sm h-10 w-10 border-gray-300 bg-gray-50 hover:border-gray-300 hover:bg-gray-50 group-visited:border-purple-400 group-visited:bg-purple-200 group-visited:text-neutral-800 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700"
        >
          WSI
        </button>
        {tooltipText && (
          <div className="dark:bg-dark absolute bottom-11 w-max scale-0 rounded border border-gray-500 bg-white p-[2px]  transition-all group-hover:scale-100">
            <span className="text-xs">{tooltipText}</span>
          </div>
        )}
      </div>
    </a>
  );
};

export default BGVis;
