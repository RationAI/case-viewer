import React from "react";
import FileCard from "./FileCard";

const FileCardStack = () => {
  return (
    <div className="stack">
      <div>
        <FileCard />
      </div>
      <div className="!translate-x-2 !translate-y-2">
        <FileCard />
      </div>
      <div className="!translate-x-4 !translate-y-4">
        <FileCard />
      </div>
    </div>
  );
};

export default FileCardStack;
