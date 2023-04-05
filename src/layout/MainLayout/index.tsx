import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Modal from "../../components/basic/Modal";
import { MainContext } from "../MainContextProvider";

interface MainLayoutProps {
  children?: JSX.Element | Array<JSX.Element>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { showSetting, setShowSetting } = useContext(MainContext);
  const [apikey, setApiKey] = useState("");

  const onSaveSettings = (value: string) => {
    if (typeof window !== "undefined") localStorage.setItem("settings", JSON.stringify({ apiKey: value }));
    setShowSetting(false);
  };

  useEffect(() => {
    const localSettings = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("settings") as string) : "";
    if (!localSettings) {
      setShowSetting(true);
    } else {
      setApiKey(localSettings?.apiKey);
    }
  }, []);

  return (
    <div className="h-screen md:flex">
      <Sidebar />
      {children}
      <Modal isOpen={showSetting} setIsOpen={setShowSetting} title="Setting">
        <div className="p-4 min-w-sm">
          <input
            type="text"
            className="w-full p-2 bg-transparent border rounded-lg outline-none ring-0 border-third"
            value={apikey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <div className="flex justify-center gap-3 my-4">
            <button className="w-24 p-2 rounded-md bg-third text-primary" onClick={() => onSaveSettings(apikey)}>
              Save
            </button>
            <button className="w-24 p-2 rounded-md bg-third text-primary" onClick={() => setShowSetting(false)}>
              Cancel
            </button>
          </div>
          <div className="text-center decoration-slice">
            <a className="border-b" href="https://platform.openai.com/account/api-keys">
              Get Your API Key from here
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MainLayout;
