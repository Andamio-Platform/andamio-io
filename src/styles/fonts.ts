import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

// Self-hosted and preloaded by next/font. Every stylesheet and token refers to
// these through the CSS variables below, never by family name.
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
// Only the badge face title uses Montserrat.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-montserrat",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable}`;

/** `:root` declarations, for the pages router where no component owns <html>. */
export const fontVariablesCss = `:root{--font-inter:${inter.style.fontFamily};--font-jetbrains:${jetbrainsMono.style.fontFamily};--font-montserrat:${montserrat.style.fontFamily};}`;
