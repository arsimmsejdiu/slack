import React, { RefObject } from "react";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface DisplayImageProps {
  image: File | null;
  setImage: (image: File | null) => void;
  imageRef: RefObject<HTMLInputElement>;
}

export const DisplayImage = ({
  image,
  setImage,
  imageRef,
}: DisplayImageProps) => {
  return (
    <div className="p-2">
      <div className="relative size-[62px] flex items-center justify-center group/image">
        <button
          onClick={() => {
            setImage(null);
            imageRef.current!.value = "";
          }}
          className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
        >
          <XIcon className="size-3.5" />
        </button>
        <Image 
            src={URL.createObjectURL(image!)}
            alt="Image"
            className="border rounded-xl overflow-hidden object-cover"
            fill
        />
      </div>
    </div>
  );
};
