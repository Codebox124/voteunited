import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import LayoutClient from "./layoutClient";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vote United",
  description:
    "Vote United — Empowering citizens to make informed political choices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} font-sans antialiased`}
      >
        <LayoutClient>{children}
          <Toaster position="top-right" />
        </LayoutClient>
      </body>
    </html>
  );
}
