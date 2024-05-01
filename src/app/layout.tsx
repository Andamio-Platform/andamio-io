import "../styles/globals.css";
import "../styles/buttons.css";
import "../styles/loading.css";
import type { Metadata } from "next";

import { Source_Code_Pro, Martel_Sans } from "next/font/google";

const martel_sans = Martel_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "400", "600", "800"],
  variable: "--font-martel-sans",
});

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "400", "600", "800"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "Andamio",
  description: "Welcome to Andamio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="andamio" className={`${source_code_pro.variable} ${martel_sans.variable}`}>
      <body>
          <div className="flex flex-col bg-cover bg-fixed">
            <div className="min-h-[80vh]">{children}</div>
          </div>
      </body>
    </html>
  );
}
