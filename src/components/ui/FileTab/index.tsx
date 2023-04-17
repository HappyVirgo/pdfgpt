import React, { useContext, useState } from "react";
import * as uuid from "uuid";
import { FileType, MainContext } from "../../../layout/MainContextProvider";
import { CircleStackIcon, DocumentPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../../layout/AuthContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../../basic/Modal";
import Button from "../../basic/Button";

type FileTabProps = {
  loading: boolean;
};

const FileTab: React.FC<FileTabProps> = ({ loading }) => {
  const { tokens } = useContext(AuthContext);
  const { files, setFiles, setShowPdf } = useContext(MainContext);
  const [shwoPopUp, setShowPopUp] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType>();
  const addNewDocument = () => {
    if (files.length === 0 || files.at(-1)?.file || files.at(-1)?.s3_url) {
      setFiles((prev: FileType[]) => [
        ...prev.map((item: FileType) => ({ ...item, active: false })),
        {
          order: prev.length + 1,
          name: "New",
          uid: uuid.v4(),
          file: undefined,
          ip: "",
          s3_url: "",
          active: true,
          messages: [],
          isEmbedded: false,
        },
      ]);
      setShowPdf(false);
    }
  };

  const activeDocument = (selected: FileType) => {
    if (!selected.active) {
      setFiles((prev: FileType[]) => {
        const newFiles = prev.map((item: FileType) => ({ ...item, active: false }));
        const activeIndex = newFiles.findIndex((item: FileType) => item.uid === selected.uid);

        if (activeIndex > -1) {
          newFiles[activeIndex].active = true;
        }

        return newFiles;
      });
    }
  };

  const removeDocument = (selected: FileType) => {
    setFiles((prev: FileType[]) => [
      ...prev
        .filter((item: FileType) => item.uid !== selected.uid)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => ({ ...item, order: index + 1 })),
    ]);
  };

  const saveHistory = async (selected: FileType) => {
    try {
      if (selected.messages.length) {
        const formData = new FormData();
        formData.append("name", `${selected.name}`);
        formData.append("uid", `${selected.uid}`);
        formData.append("messages", JSON.stringify(selected.messages));
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_BASEURL}/history`, formData, {
          headers: {
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
        });
        toast("History is saved");
      }
    } catch (error) {
      toast("Saving is faild");
    }
  };

  return (
    <div className="absolute left-0 z-20 flex items-center w-full h-10 overflow-x-auto text-white bg-primary top-12 md:top-0">
      {files
        .sort((a, b) => a?.order - b?.order)
        .map((item, index) => (
          <button
            disabled={loading}
            key={index}
            onClick={() => activeDocument(item)}
            className={`w-32 disabled:text-darkText disabled:cursor-not-allowed cursor-pointer h-full flex-none text-xs relative text-center pt-3 px-2 truncate whitespace-nowrap border-r border-bgRadialStart ${
              item.active ? "rounded-tr-lg bg-bgRadialEnd" : "bg-primary rounded-none"
            }`}
          >
            <span>{`${item.name}-${item.uid}`}</span>
            <a
              onClick={(e) => {
                e.stopPropagation();
                if (item.file || item.messages.length > 0 || item.s3_url) {
                  setSelectedFile(item);
                  setShowPopUp(true);
                } else {
                  removeDocument(item);
                }
              }}
              className="absolute top-0 right-0 p-1"
            >
              <XMarkIcon className="w-4 text-white" />
            </a>
            <a
              onClick={(e) => {
                e.stopPropagation();
                if (!loading) {
                  saveHistory(item);
                }
              }}
              className="absolute top-0 p-1 right-5"
            >
              <CircleStackIcon className="w-4 text-white" />
            </a>
          </button>
        ))}
      <button
        // disabled={!(files.length === 0 || files.at(-1)?.file || files.at(-1)?.s3_url) || loading}
        className="px-2 disabled:text-darkText disabled:cursor-not-allowed"
        onClick={addNewDocument}
      >
        <DocumentPlusIcon className="w-5" />
      </button>
      <Modal isOpen={shwoPopUp} setIsOpen={setShowPopUp} title="You have unsaved history">
        <div className="mt-5 space-y-2 text-center">
          <p>You have unsaved history, are you sure you want to close tab</p>
          <div className="flex items-center justify-center gap-5">
            <Button
              text="Save"
              onClick={async () => {
                if (selectedFile) {
                  await saveHistory(selectedFile);
                  removeDocument(selectedFile);
                }
              }}
            />
            <Button text="Cancel" onClick={() => setShowPopUp(false)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileTab;
