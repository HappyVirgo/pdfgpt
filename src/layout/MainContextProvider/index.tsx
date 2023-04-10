/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, SetStateAction, useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";

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
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        const { data } = await axios.post("api/auto_login", { token });
        setUser(data?.dataValues);
        setTokens({ refresh_token: data?.refreshToken });
        localStorage.setItem("email", data?.dataValues?.email ?? "");
        localStorage.setItem("token", data?.refreshToken ?? "");
      }
    } catch (error: any) {
      console.error(error.response);
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
