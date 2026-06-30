import "~/styles/globals.css";
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { Toaster as UiToaster } from "~/components/ui/toaster";
import Metatags from "~/components/site/metatags";
import { ThemeProvider } from "~/components/theme-provider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
