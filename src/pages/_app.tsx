import "~/styles/globals.css";
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { Toaster as UiToaster } from "~/components/ui/toaster";
import { DialogReportSupport } from "~/ui/site/DialogReportSupport";
import Metatags from "~/components/site/metatags";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <div>
      <Metatags />
      <Toaster position="top-right" />
      <div className="min-h-screen bg-background text-foreground">
        <Component {...pageProps} />
        <UiToaster />
      </div>
      <DialogReportSupport />
    </div>
  );
};

export default MyApp;
