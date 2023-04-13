import React, { useContext } from "react";
import * as uuid from "uuid";
import { FileType, MainContext } from "../../../layout/MainContextProvider";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FileTab = () => {
  const { files, setFiles, setShowPdf } = useContext(MainContext);
  const addNewDocument = () => {
    // @ts-ignore
    setFiles((prev: FileType[]) =>
      [
        ...prev.filter((item: FileType) => !item.active),
        { ...prev.find((item: FileType) => item.active), active: false },
        {
          order: prev.length + 1,
          name: "New",
          uid: uuid.v4(),
          file: undefined,
          ip: "",
          s3_url: "",
          active: true,
          messages: [],
        },
      ].filter((item) => item.order)
    );
    setShowPdf(false);
  };

  const activeDocument = (selected: FileType) => {
    if (!selected.active) {
      // @ts-ignore
      setFiles((prev: FileType[]) =>
        [
          ...prev.filter((item: FileType) => !item.active && item.uid !== selected.uid),
          { ...prev.find((item: FileType) => item.active), active: false },
          { ...prev.find((item: FileType) => item.uid === selected.uid), active: true },
        ].filter((item) => item.order)
      );
    }
  };

  const removeDocument = (selected: FileType) => {
    // @ts-ignore
    setFiles((prev: FileType[]) => [
      ...prev
        .filter((item: FileType) => item.uid !== selected.uid)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => ({ ...item, order: index + 1 })),
    ]);
  };
  return (
    <div className="flex w-full overflow-x-auto bg-primary items-center z-20 h-10 absolute top-0 left-0 text-white">
      {files
        .sort((a, b) => a?.order - b?.order)
        .map((item, index) => (
          <a
            key={index}
            onClick={() => activeDocument(item)}
            className={`w-32 cursor-pointer h-full flex-none text-xs relative text-center pt-3 px-2 truncate whitespace-nowrap border-r border-bgRadialStart ${
              item.active ? "rounded-tr-lg bg-bgRadialEnd" : "bg-primary rounded-none"
            }`}
          >
            <span>{`${item.name}-${item.uid}`}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeDocument(item);
              }}
              className="absolute right-0 top-0 p-1"
            >
              <XMarkIcon className="w-4 text-white" />
            </button>
          </a>
        ))}
      <button className="px-2" onClick={addNewDocument}>
        <DocumentPlusIcon className="w-5" />
      </button>
    </div>
  );
};

export default FileTab;
