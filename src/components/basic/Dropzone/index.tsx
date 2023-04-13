import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import UploadPattern from "../../../assets/svg/upload_pattern.svg";
import UploadIcon from "../../../assets/svg/upload.svg";
import { FileType, MainContext } from "../../../layout/MainContextProvider";

const MyDropzone = () => {
  const { setShowPdf, setFiles } = useContext(MainContext);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    // @ts-ignore
    setFiles((prev: FileType[]) => [
      ...prev.filter((item) => !item.active),
      { ...prev.find((item) => item.active), file: file, name: file.name },
    ]);
    setShowPdf(true);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full bg-transparent border-none outline-none dark:bg-gradient-radial ring-0"
    >
      <input {...getInputProps()} className="border-none outline-none ring-0" />
      <div className="flex flex-col items-center justify-center">
        <UploadPattern />
        <button className="flex items-center justify-center gap-6 px-4 py-3 mt-2 font-base bg-third">
          <p className="text-white">UPLOAD YOUR FILE</p>
          <UploadIcon />
        </button>
        <p className="mt-2 text-sm text-center text-semiLightText">Click or drag file tothis area to upload</p>
      </div>
    </div>
  );
};

export default MyDropzone;
