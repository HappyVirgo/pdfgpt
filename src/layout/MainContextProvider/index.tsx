/* eslint-disable no-unused-vars */
import React, { createContext, SetStateAction, useEffect, useState } from "react";

type MainContextType = {
  isDarkTheme: Boolean;
  toggleThemeHandler: VoidFunction;
  showPdf: boolean;
  setShowPdf: React.Dispatch<SetStateAction<boolean>>;
  file?: File | { [key: string]: string } | undefined;
  setFile: React.Dispatch<SetStateAction<File | { [key: string]: string } | undefined>>;
  showSetting: boolean;
  setShowSetting: React.Dispatch<SetStateAction<boolean>>;
  recent: { [key: string]: string }[];
  setRecent: React.Dispatch<SetStateAction<{ [key: string]: string }[]>>;
  pageNum: number;
  setPageNum: React.Dispatch<SetStateAction<number>>;
};

const MainContextValue: MainContextType = {
  isDarkTheme: true,
  toggleThemeHandler: () => {},
  showPdf: false,
  setShowPdf: () => {},
  file: undefined,
  setFile: () => {},
  showSetting: false,
  setShowSetting: () => {},
  recent: [],
  setRecent: () => {},
  pageNum: 1,
  setPageNum: () => {},
};

export const MainContext = createContext(MainContextValue);

interface ThemePropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

const MainContextProvider: React.FC<ThemePropsInterface> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [file, setFile] = useState<File | { [key: string]: string } | undefined>(undefined);
  const [showSetting, setShowSetting] = useState(false);
  const [recent, setRecent] = useState<{ [key: string]: string }[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);

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

  useEffect(() => initialThemeHandler());

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

  return (
    <MainContext.Provider
      value={{
        isDarkTheme,
        showPdf,
        file,
        showSetting,
        recent,
        pageNum,
        setShowPdf,
        toggleThemeHandler,
        setFile,
        setShowSetting,
        setRecent,
        setPageNum,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
