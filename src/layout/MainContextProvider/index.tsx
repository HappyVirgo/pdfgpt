/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, SetStateAction, useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";

type DriveFileType = {
  id: string;
  kind: string;
  mimeType: string;
  name: string;
};

export type MessageItem = {
  type: "QUESTION" | "REPLY";
  message: string;
  references?: { id: number; content: string; page_num: number }[];
};

export type FileType = {
  order: number;
  name?: string;
  uid?: string;
  file?: File;
  ip?: string;
  s3_url?: string;
  active: boolean;
  total_pages?: number;
  messages: MessageItem[];
};

type MainContextType = {
  isDarkTheme: Boolean;
  toggleThemeHandler: VoidFunction;
  showPdf: boolean;
  setShowPdf: React.Dispatch<SetStateAction<boolean>>;
  file?: File | { [key: string]: string } | undefined;
  setFile: React.Dispatch<SetStateAction<File | { [key: string]: string } | undefined>>;
  files: FileType[];
  setFiles: React.Dispatch<FileType[]>;
  showSetting: boolean;
  setShowSetting: React.Dispatch<SetStateAction<boolean>>;
  recent: { [key: string]: string }[];
  setRecent: React.Dispatch<SetStateAction<{ [key: string]: string }[]>>;
  pageNum: number;
  setPageNum: React.Dispatch<SetStateAction<number>>;
  driveFiles: DriveFileType[];
  setDriveFiles: React.Dispatch<SetStateAction<DriveFileType[]>>;
};

const MainContextValue: MainContextType = {
  isDarkTheme: true,
  toggleThemeHandler: () => {},
  showPdf: false,
  setShowPdf: () => {},
  file: undefined,
  setFile: () => {},
  files: [],
  setFiles: () => {},
  showSetting: false,
  setShowSetting: () => {},
  recent: [],
  setRecent: () => {},
  pageNum: 1,
  setPageNum: () => {},
  driveFiles: [],
  setDriveFiles: () => {},
};

export const MainContext = createContext(MainContextValue);

interface ThemePropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

const MainContextProvider: React.FC<ThemePropsInterface> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [file, setFile] = useState<File | { [key: string]: string } | undefined>(undefined);
  const [files, setFiles] = useState<FileType[]>([]);
  const [showSetting, setShowSetting] = useState(false);
  const [recent, setRecent] = useState<{ [key: string]: string }[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [driveFiles, setDriveFiles] = useState<DriveFileType[]>([]);
  const { setUser, setTokens } = useContext(AuthContext);

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem("isDarkTheme", `true`);
      document!.querySelector("body")!.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      const isDarkTheme: boolean = JSON.parse(localStorage.getItem("isDarkTheme")!);
      isDarkTheme && document!.querySelector("body")!.classList.add("dark");
      setIsDarkTheme(isDarkTheme);
    }
  }

  async function autoLogin() {
    try {
      setIsLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
      const google_token = typeof window !== "undefined" ? localStorage.getItem("googleAuthToken") : null;
      if (token && google_token) {
        const { data } = await axios.post("api/auto_login", { token, google_token });
        setUser(data?.user);
        setTokens(data?.tokens);
        setDriveFiles(data?.files);
        localStorage.setItem("refreshToken", data?.tokens?.refreshToken ?? "");
        localStorage.setItem("accessToken", data?.tokens?.accessToken ?? "");
      }
      setIsLoading(false);
    } catch (error: any) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("googleAuthToken");
      setIsLoading(false);
    }
  }

  useEffect(() => initialThemeHandler());
  useEffect(() => {
    autoLogin();
  }, []);

  function toggleDarkClassToBody(): void {
    document!.querySelector("body")!.classList.toggle("dark");
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
  }

  function toggleThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(localStorage.getItem("isDarkTheme")!);
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }

  return isLoading ? null : (
    <MainContext.Provider
      value={{
        isDarkTheme,
        showPdf,
        file,
        files,
        showSetting,
        recent,
        pageNum,
        driveFiles,
        setShowPdf,
        toggleThemeHandler,
        setFile,
        setFiles,
        setShowSetting,
        setRecent,
        setPageNum,
        setDriveFiles,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
