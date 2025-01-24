"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

//
// 1) Define a placeholder type for the widget parameter.
//    You can refine it with actual widget methods/properties if needed.
//
type CldUploadEventCallbackWidget = {
  open?: () => void;
  close?: () => void;
  destroy?: () => void;
  // ...any other properties you need
};

//
// 2) Export your custom callback type using the placeholder above.
//
export type CldUploadEventCallback = (
  results: CloudinaryUploadWidgetResults,
  widget: CldUploadEventCallbackWidget
) => void;

//
// 3) Regular component props
//
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

//
// 4) The ImageUpload component
//
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  //
  // Because next-cloudinary doesn't export CldUploadEventCallback,
  // we use our own custom type alias here:
  //
  const handleUploadSuccess: CldUploadEventCallback = useCallback(
    (results) => {
      if (results.event === "success") {
        const info = results.info;
        // `info` can be a string or an object; narrow the type before accessing secure_url
        if (typeof info !== "string" && info?.secure_url) {
          onChange(info.secure_url);
        }
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUploadSuccess}
      uploadPreset="preset-01"  // Replace with your own preset
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed
            border-2
            p-20
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
          "
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>

          {value && (
            <div className="absolute inset-0 w-full">
              <Image
                alt="Upload"
                fill
                style={{ objectFit: "cover" }}
                src={value}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
