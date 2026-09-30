import "~/styles/globals.css";
import "~/styles/proof-badge.css";
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { Toaster as UiToaster } from "~/components/ui/toaster";
import Metatags from "~/components/site/metatags";
import { ThemeProvider } from "~/components/theme-provider";
import { fontVariablesCss } from "~/styles/fonts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
      <style dangerouslySetInnerHTML={{ __html: fontVariablesCss }} />
      <Metatags />
      <Toaster position="top-right" />
      <div className="min-h-screen bg-background text-foreground">
        <Component {...pageProps} />
        <UiToaster />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
