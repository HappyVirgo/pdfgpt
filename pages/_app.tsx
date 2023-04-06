import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

import MainContextProvider from "../src/layout/MainContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENTID ?? ""}>
      <MainContextProvider>
        <Component {...pageProps} />
      </MainContextProvider>
    </GoogleOAuthProvider>
  );
}
