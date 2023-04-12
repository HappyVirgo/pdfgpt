import React, { Fragment, useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Menu } from "@headlessui/react";
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
import GoogleIcon from "../../../assets/svg/google.svg";
import PDFSVG from "../../../assets/svg/pdf.svg";
import Accordion from "../../basic/Accordion";
import { AuthContext } from "../../../layout/AuthContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const {
    file,
    isDarkTheme,
    toggleThemeHandler,
    setShowPdf,
    setShowSetting,
    recent,
    setRecent,
    setFile,
    driveFiles,
    setDriveFiles,
  } = useContext(MainContext);
  const { push } = useRouter();
  const { user, setUser, setTokens } = useContext(AuthContext);
  const [isRecentView, setIsRecentView] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleThemeHander = () => {
    toggleThemeHandler();
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      localStorage.setItem("googleAuthToken", tokenResponse?.access_token ?? "");
      const { data } = await axios.post("api/auth", { tokens: tokenResponse });
      console.log("data: ", data);
      setUser(data?.user);
      setTokens(data?.tokens);
      setDriveFiles(data?.files ?? []);
      localStorage.setItem("refreshToken", data?.tokens?.refreshToken ?? "");
      localStorage.setItem("accessToken", data?.tokens?.accessToken ?? "");
    },
  });

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    push("/");
  };

  return (
    <Fragment>
      <div className="hidden py-10 shadow-lg xl:py-20 md:w-24 xl:w-380 bg-primary md:flex">
        <div className="flex-col justify-between hidden w-full px-5 overflow-auto text-white xl:flex">
          <div className="mx-auto space-y-2 text-white text-md font-base">
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
            <button className="flex items-center gap-3 hover:text-white" onClick={() => push("/plan")}>
              <SearchSVG />
              Pricing
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
            <Accordion title="Google Drive">
              <button className="w-32 ml-6 space-y-1 text-sm" onClick={() => {}}>
                {driveFiles?.map((item) => (
                  <button className="flex items-center justify-start w-full gap-1" key={item.id}>
                    <div className="flex-none">
                      <PDFSVG />
                    </div>
                    <div className="flex-1 text-left truncate whitespace-nowrap">{item.name}</div>
                  </button>
                ))}
              </button>
            </Accordion>
          </div>
          <div className="mt-10 text-md font-base">
            <button
              onClick={toggleThemeHander}
              className="flex items-center gap-3 mx-auto transition-all duration-300 hover:text-white text-darkText"
            >
              {!isDarkTheme ? <DarkSVG /> : <LightSVG />}
              {isDarkTheme ? "Light mode" : "Dark mode"}
            </button>
            {user ? (
              <div className="relative w-full py-3 mt-10 text-center text-white transition-all duration-300 rounded-full cursor-pointer bg-bgRadialEnd">
                <div className="absolute -translate-y-1/2 top-1/2 left-1">
                  <Image alt="avatar" src={user.picture} width={40} height={40} className="rounded-full"></Image>
                </div>
                <div className="ml-2">
                  <p>{user.name}</p>
                </div>
                <div className="absolute top-0 right-4">
                  <Menu>
                    <Menu.Button className="w-full px-2 py-2 text-right text-md">...</Menu.Button>
                    <Menu.Items className="absolute right-0 w-20 text-sm text-right transform -translate-y-full rounded-lg shadow-lg bg-bgRadialStart top-4">
                      <Menu.Item>
                        <Link href="/profile">
                          <div className="px-2 pt-1 pb-2">Profile</div>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button onClick={logout} className="px-2 pt-1 pb-2">
                          Logout
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="relative w-full py-3 mt-10 text-center text-white transition-all duration-300 bg-transparent border rounded-full cursor-pointer"
              >
                Login
                <div className="absolute -translate-y-1/2 right-2 top-1/2">
                  <GoogleIcon />
                </div>
              </button>
            )}
            <div className="flex justify-between w-full mt-3 itmes-center">
              {[
                { link: "https://discord.gg/wQpAvefeqW", label: "Discord" },
                { link: "https://twitter.com/pdfgpt", label: "Twitter" },
                { link: "https://discord.gg/wQpAvefeqW", label: "Report Bug" },
                { link: "#", label: "Contact Us", onClick: () => setShowContactModal(true) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-xs transition-all duration-300 cursor-pointer hover:text-white text-darkText"
                >
                  <a href={item.link} onClick={item?.onClick}>
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
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
