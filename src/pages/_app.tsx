import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";

import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import DebugUiPage from "./debug/ui";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";

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
        <div className="bg-background min-h-screen text-foreground">
          <Component {...pageProps} />
          <DebugUiPage />
          <LightDarkToggle />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
