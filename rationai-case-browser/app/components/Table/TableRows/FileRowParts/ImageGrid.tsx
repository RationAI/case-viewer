import { ImageT } from "@/type-definitions";
import React from "react";
import Image from "next/image";

type Props = {
  images: ImageT[];
  count: number;
  typeName: string;
  rowNo: number;
};

const ImageGrid = ({ images, count, typeName, rowNo }: Props) => {
  const finalImages = images.slice(0, count - 1)
  return (
  <div className={"grid gap-1 w-[4.25rem] aspect-square " + (count > 4 ? "grid-cols-3" : "grid-cols-2")}>
    <div className="text-center">
      <Image
        className="block opacity-70"
        src="/svg/dots.svg"
        alt="Expand"
        height={20}
        width={20}
      />
    </div>
    {finalImages.map((image, idx) => 
      <div key={idx}>
        <input className='hidden peer' type='checkbox' id={typeName + rowNo + idx} name={image.name} defaultChecked={(idx === 0)}></input>
        <label className='opacity-30 peer-checked:opacity-100 ' htmlFor={typeName + rowNo + idx}>
          <Image
            src={image.imageLink}
            alt={image.name}
            height={20}
            width={20}
          />
        </label>
      </div>
    )}
  </div>
  );
};

export default ImageGrid;
