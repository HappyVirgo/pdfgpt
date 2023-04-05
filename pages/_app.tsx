import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainContextProvider from "../src/layout/MainContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainContextProvider>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}
