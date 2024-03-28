import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";

import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import DebugUiPage from "./debug/ui";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Toaster position="top-right" />
        <div className="bg-stone-100 min-h-screen text-stone-950">
          <Component {...pageProps} />
          <DebugUiPage />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
