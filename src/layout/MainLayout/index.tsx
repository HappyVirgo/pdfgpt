import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/ui/Sidebar";
import Modal from "../../components/basic/Modal";
import { MainContext } from "../MainContextProvider";

interface MainLayoutProps {
  children?: JSX.Element | Array<JSX.Element>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const { showSetting, setShowSetting } = useContext(MainContext);
  // const [apikey, setApiKey] = useState("");

  // const onSaveSettings = (value: string) => {
  //   if (value) {
  //     if (typeof window !== "undefined") localStorage.setItem("settings", JSON.stringify({ apiKey: value }));
  //     setShowSetting(false);
  //   } else {
  //     toast("You should input apikey");
  //   }
  // };

  // useEffect(() => {
  //   const localSettings = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("settings") as string) : "";
  //   if (!localSettings) {
  //     setShowSetting(true);
  //   } else {
  //     setApiKey(localSettings?.apiKey);
  //   }
  // }, []);

  return (
    <div className="h-screen md:flex">
      <Sidebar />
      {children}
      <ToastContainer
        autoClose={5000}
        position="top-right"
        closeOnClick={true}
        pauseOnHover={true}
        hideProgressBar={false}
        draggable={true}
        theme="dark"
      />
    </div>
  );
};

export default MainLayout;
