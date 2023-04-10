import React, { Fragment, useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Modal from "../../basic/Modal";
import Drawer from "../../basic/Drawer";
import { MainContext } from "../../../layout/MainContextProvider";
import NewSVG from "../../../assets/svg/new.svg";
import EyeSVG from "../../../assets/svg/eye.svg";
import SearchSVG from "../../../assets/svg/search.svg";
import ListSVG from "../../../assets/svg/list.svg";
import DarkSVG from "../../../assets/svg/dark.svg";
import LightSVG from "../../../assets/svg/light.svg";
import TrashSVG from "../../../assets/svg/trash.svg";
import Accordion from "../../basic/Accordion";
import { AuthContext } from "../../../layout/AuthContextProvider";
import Image from "next/image";

const Sidebar = () => {
  const { file, isDarkTheme, toggleThemeHandler, setShowPdf, setShowSetting, recent, setRecent, setFile } =
    useContext(MainContext);
  const { user, setUser, setTokens } = useContext(AuthContext);
  const [isRecentView, setIsRecentView] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleThemeHander = () => {
    toggleThemeHandler();
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data } = await axios.post("api/auth", { tokens: tokenResponse });
      setUser(data?.user);
      setTokens(data?.tokens);
      localStorage.setItem("refreshToken", data?.tokens?.refreshToken ?? "");
      localStorage.setItem("accessToken", data?.tokens?.accessToken ?? "");
    },
  });

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  };

  return (
    <Fragment>
      <div className="hidden py-10 shadow-lg xl:py-20 md:w-24 xl:w-380 bg-primary md:flex">
        <div className="flex-col justify-between hidden mx-auto overflow-auto text-white xl:flex">
          <div className="space-y-2 text-white text-md font-base">
            <button onClick={() => window.location.reload()} className="flex items-center gap-3 hover:text-white">
              <NewSVG />
              New PDF
            </button>
            <button
              onClick={() => {
                setShowPdf(true);
              }}
              disabled={isRecentView || !file}
              className="flex items-center gap-3 hover:text-white disabled:text-darkText disabled:cursor-not-allowed"
            >
              <EyeSVG />
              Show PDF
            </button>
            <button className="flex items-center gap-3 hover:text-white" onClick={() => setShowSetting(true)}>
              <SearchSVG />
              Change API Key
            </button>
            <Accordion title="Recent">
              <div className="w-32 ml-6 text-sm">
                {recent.length > 0 &&
                  recent.map((item, index) => (
                    <div
                      key={index}
                      className="py-0.5 cursor-pointer flex items-center"
                      onClick={() => {
                        setIsRecentView(true);
                        setFile({ uid: Object.keys(item)[0], name: Object.values(item)[0] });
                      }}
                    >
                      <span className="flex-1 truncate whitespace-nowrap">{Object.values(item)[0]}</span>
                      <button
                        className="flex-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecent((prev) => [...prev.filter((rec) => Object.keys(item)[0] !== Object.keys(rec)[0])]);
                          if (typeof window !== "undefined") {
                            localStorage.setItem(
                              "files",
                              JSON.stringify([...recent.filter((rec) => Object.keys(item)[0] !== Object.keys(rec)[0])])
                            );
                          }
                        }}
                      >
                        <TrashSVG />
                      </button>
                    </div>
                  ))}
              </div>
            </Accordion>
          </div>
          <div className="mt-10 space-y-2 text-md font-base">
            <button
              onClick={toggleThemeHander}
              className="flex items-center gap-3 transition-all duration-300 hover:text-white text-darkText"
            >
              {!isDarkTheme ? <DarkSVG /> : <LightSVG />}
              {isDarkTheme ? "Light mode" : "Dark mode"}
            </button>
            {[
              { link: "https://discord.gg/wQpAvefeqW", label: " Join Discord" },
              { link: "https://twitter.com/pdfgpt", label: "Twitter" },
              { link: "https://discord.gg/wQpAvefeqW", label: "Report Bug" },
              { link: "#", label: "Contact Us", onClick: () => setShowContactModal(true) },
            ].map((item) => (
              <div
                key={item.label}
                className="ml-8 transition-all duration-300 cursor-pointer hover:text-white text-darkText"
              >
                <a href={item.link} onClick={item?.onClick}>
                  {item.label}
                </a>
              </div>
            ))}
            {user ? (
              <div>
                <div className="flex items-center pt-3 transition-all duration-300 cursor-pointer hover:text-white text-darkText">
                  <Image alt="avatar" src={user.picture} width={25} height={25} className="rounded-full"></Image>
                  <div className="ml-2">
                    <p>{user.name}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="flex items-center gap-3 transition-all duration-300 cursor-pointer hover:text-white text-darkText"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="ml-8 transition-all duration-300 cursor-pointer hover:text-white text-darkText">
                <button onClick={() => login()}>Login</button>
              </div>
            )}
          </div>
        </div>
        <div className="justify-center hidden w-full xl:hidden md:flex">
          <button className="h-fit" onClick={() => setShowDrawer(true)}>
            <ListSVG />
          </button>
        </div>
      </div>
      <div className="fixed top-0 right-0 z-10 flex items-center justify-between w-full h-12 px-4 text-white md:hidden bg-primary">
        <button onClick={() => setShowDrawer(true)}>
          <ListSVG />
        </button>
        <button onClick={() => window.location.reload()}>New PDF</button>
      </div>
      <Modal isOpen={showContactModal} setIsOpen={setShowContactModal} title="Contact Us">
        <div className="mt-5 space-y-2">
          <p>
            Contact Us for queries/question:
            <a href="mailto:pdfgpt@gmail.com?subject=PDFGPTqueries" className="ml-2 border-b">
              Click here
            </a>
          </p>
          <p>
            Contact Us for Business Purpose:
            <a href="mailto:pdfgpt@gmail.com?subject=PDFGPTBusiness" className="ml-2 border-b">
              Click here
            </a>
          </p>
          <p>
            Join our discord:
            <a
              onClick={() => {
                window.open("https://discord.gg/wQpAvefeqW", "_blank");
              }}
              className="ml-2 border-b"
            >
              Join Discord
            </a>
          </p>
          <p>
            Or Write us at:
            <a href="mailto:pdfgpt@gmail.com?subject=PDFGPTOthers" className="ml-2 border-b">
              pdfgpt@gmail.com
            </a>
          </p>
          <p>Developer: Mihir Kanzariya: (kanzariyamihir@gmail.com)</p>
          <p>Email: kanzariyamihir@gmail.com</p>
        </div>
      </Modal>
      <Drawer isOpen={showDrawer} setIsOpen={setShowDrawer}>
        <div className="flex flex-col justify-between w-full h-full mx-auto overflow-auto text-white">
          <div className="space-y-2 text-white text-md font-base">
            <button
              onClick={() => {
                window.location.reload();
                setShowDrawer(false);
              }}
              className="flex items-center gap-3 hover:text-white"
            >
              <NewSVG />
              New PDF
            </button>
            <button
              onClick={() => {
                setShowPdf(true);
                setShowDrawer(false);
              }}
              disabled={isRecentView || !file}
              className="flex items-center gap-3 hover:text-white disabled:text-darkText disabled:cursor-not-allowed"
            >
              <EyeSVG />
              Show PDF
            </button>
            <button
              className="flex items-center gap-3 hover:text-white"
              onClick={() => {
                setShowSetting(true);
                setShowDrawer(false);
              }}
            >
              <SearchSVG />
              Change API Key
            </button>
            <Accordion title="Recent">
              <div className="w-32 ml-6 text-sm">
                {recent.length > 0 &&
                  recent.map((item, index) => (
                    <div
                      key={index}
                      className="py-0.5 cursor-pointer flex items-center"
                      onClick={() => {
                        setIsRecentView(true);
                        setFile({ uid: Object.keys(item)[0], name: Object.values(item)[0] });
                        setShowDrawer(false);
                      }}
                    >
                      <span className="flex-1 truncate whitespace-nowrap">{Object.values(item)[0]}</span>
                      <button
                        className="flex-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecent((prev) => [...prev.filter((rec) => Object.keys(item)[0] !== Object.keys(rec)[0])]);
                          if (typeof window !== "undefined") {
                            localStorage.setItem(
                              "files",
                              JSON.stringify([...recent.filter((rec) => Object.keys(item)[0] !== Object.keys(rec)[0])])
                            );
                          }
                          setShowDrawer(false);
                        }}
                      >
                        <TrashSVG />
                      </button>
                    </div>
                  ))}
              </div>
            </Accordion>
          </div>
          <div className="mt-10 space-y-2 text-md font-base">
            <button
              onClick={toggleThemeHander}
              className="flex items-center gap-3 transition-all duration-300 hover:text-white text-darkText"
            >
              {!isDarkTheme ? <DarkSVG /> : <LightSVG />}

              {isDarkTheme ? "Light mode" : "Dark mode"}
            </button>
            {[
              { link: "https://discord.gg/wQpAvefeqW", label: " Join Discord" },
              { link: "https://twitter.com/pdfgpt", label: "Twitter" },
              { link: "https://discord.gg/wQpAvefeqW", label: "Report Bug" },
              { link: "#", label: "Contact Us", onClick: () => setShowContactModal(true) },
            ].map((item) => (
              <div
                key={item.label}
                className="ml-8 transition-all duration-300 cursor-pointer hover:text-white text-darkText"
              >
                <a href={item.link} onClick={item?.onClick}>
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
