import React, { useContext } from "react";
import * as uuid from "uuid";
import { FileType, MainContext } from "../../../layout/MainContextProvider";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

type FileTabProps = {
  loading: boolean;
};

const FileTab: React.FC<FileTabProps> = ({ loading }) => {
  const { files, setFiles, setShowPdf } = useContext(MainContext);
  const addNewDocument = () => {
    if (files.length === 0 || files.at(-1)?.file) {
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
  return (
    <div className="flex w-full overflow-x-auto bg-primary items-center z-20 h-10 absolute top-12 md:top-0 left-0 text-white">
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
                if (!loading) {
                  removeDocument(item);
                }
              }}
              className="absolute right-0 top-0 p-1"
            >
              <XMarkIcon className="w-4 text-white" />
            </a>
          </button>
        ))}
      <button
        disabled={!(files.length === 0 || files.at(-1)?.file) || loading}
        className="px-2 disabled:text-darkText disabled:cursor-not-allowed"
        onClick={addNewDocument}
      >
        <DocumentPlusIcon className="w-5" />
      </button>
    </div>
  );
};

export default FileTab;
