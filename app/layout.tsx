import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/Nav";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titillium = localFont({
  src: [
    {
      path: "./fonts/titillium-web/TitilliumWeb-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/titillium-web/TitilliumWeb-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-titillium",
  display: "swap",
});

const f1Bold = localFont({
  src: "./fonts/formula1/Formula1-Bold.ttf",
  variable: "--font-f1-bold",
  display: "swap",
});

const f1Regular = localFont({
  src: "./fonts/formula1/Formula1-Regular.ttf",
  variable: "--font-f1-regular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sonny Au — Software Engineer",
  description:
    "Full-stack products, mobile apps, and ML-leaning side projects by Sonny Au.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${titillium.variable} ${geistMono.variable} ${f1Bold.variable} ${f1Regular.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[--background] font-sans text-[--foreground]"
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("sa-intro-played")!=="1"){document.body.classList.add("intro-active")}}catch(e){document.body.classList.add("intro-active")}})();`,
          }}
        />
        <Nav />
        {children}
      </body>
    </html>
  );
}
