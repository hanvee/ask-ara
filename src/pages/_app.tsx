import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { ToastContainer } from 'react-toastify';

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={geist.className}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
