import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/Components/Provider/QueryProvider";
import ThemeProvider from "@/Context/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Threadora | Modern Cloth Commerce",
  description: "A polished fashion storefront and inventory dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased `}
    >
      <head>
        {/* <script dangerouslySetInnerHTML={
          {
            __html: `
            const theme = localStorage.getItem("dark")
            const isDark = theme === "true"
            document.documentElement.setAttribute('data-theme', isDark ? "dark" : "light")
            if (isDark) {
              document.documentElement.classList.add("dark")
            }
            else {
              document.documentElement.classList.remove('dark')
            }
          `
          }
        } /> */}
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f5ef] text-[#1f2520]">
        <Toaster></Toaster>
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
