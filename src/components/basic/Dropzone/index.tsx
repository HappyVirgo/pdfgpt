import React, { useCallback, useContext } from "react";

import * as uuid from "uuid";

import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import UploadPattern from "../../../assets/svg/upload_pattern.svg";
import UploadIcon from "../../../assets/svg/upload.svg";
import { FileType, MainContext } from "../../../layout/MainContextProvider";
import { AuthContext } from "../../../layout/AuthContextProvider";
import axios from "axios";

const MyDropzone = () => {

  
  const { user } = useContext(AuthContext);
  const { setShowPdf, setFiles } = useContext(MainContext);

  async function handleUpload(file: File, presignedUrl: string, key: string): Promise<string> {
    try {
      const response = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type
        }
      });
      console.log("🚀 ~ file: index.tsx:29 ~ handleUpload ~ response:", response)
  
      if (response.status === 200) {
        console.log('File uploaded successfully!');
        console.log(`response`, response.data)
        return `https://pdfgpt.s3.ap-south-1.amazonaws.com/${key}`
      } else {
        console.error('Failed to upload file:', response.statusText);
        throw 'Failed to upload file:';

      }
    } catch (error: any) {
      console.error('Failed to upload file:', error.message);
      throw error;
    }
  }
  

  async function getS3SignUrl(name: string, uid: string, file_id: string): Promise<{presignedUrl: string, key: string}> {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const data = { name,id: uid, file_id:uuid.v4() };
      
      const response = await axios.post<{ presignedUrl: string, key: string }>(`${process.env.NEXT_PUBLIC_BACKEND_API_BASEURL}/history/presigned-url`, data, { headers });
      console.log("🚀 ~ file: index.tsx:50 ~ getS3SignUrl ~ response:", response.data.presignedUrl)
      return {presignedUrl: response.data.presignedUrl, key: response.data.key};
    } catch (error: any) {
      console.error('Failed to get presigned URL:', error.message);
      throw error;
    }
  }
  
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file: any = acceptedFiles[0];
    console.log("🚀 ~ file: index.tsx:64 ~ onDrop ~ file:", file)
    let uid = typeof window !== "undefined" ? localStorage.getItem("uid") : null;
    if (!uid) {
      uid = uuid.v4();
      localStorage.setItem("uid", uid);
    }
        let { presignedUrl, key} = await getS3SignUrl(file.name, uid, file.id)
        console.log("🚀 ~ file: index.tsx:65 ~ onDrop ~ presignedUrl:", presignedUrl)
        let uploadedURL = await handleUpload(file, presignedUrl, key)

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          if ((file?.size ?? 0) > (user?.Plan?.size ?? 10) * 1024 * 1024) {
            toast("File size is over, you should upgrate your plan!");
            return;
          }
          setFiles((prev: FileType[]) => {
            let newFiles = prev;
            const actived = newFiles.findIndex((item) => item.active);
            newFiles[actived].file = uploadedURL;
            newFiles[actived].name = file.name;
            return newFiles;
          });
          setShowPdf(true);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full bg-transparent border-none outline-none dark:bg-gradient-radial ring-0"
    >
      <input {...getInputProps()} className="border-none outline-none ring-0" id='fil1' />
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
