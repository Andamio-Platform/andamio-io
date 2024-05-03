import "~/styles/globals.css";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "~/components/theme-provider";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import MenuBar from "~/ui/landing/MenuBar";
import { MeshProvider } from "@meshsdk/react";
import { DialogReportSupport } from "~/ui/site/DialogReportSupport";

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
        <MeshProvider>
          <Toaster position="top-right" />
          <div className="min-h-screen bg-background text-foreground">
            <Component {...pageProps} />
          </div>
          <DialogReportSupport />
        </MeshProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
