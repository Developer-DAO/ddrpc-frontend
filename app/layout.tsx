import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "D_D RPC Provider",
  description: "Custom D_D RPC Provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </div>
      </body>
    </html>
  );
}
