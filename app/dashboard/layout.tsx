"use client";
import { Karla } from "next/font/google";
import "../globals.css";
import Sidebar from "@/app/dashboard/_components/Sidebar";
import Navbar from "@/app/dashboard/_components/Navbar";
import PageWrapper from "@/app/dashboard/_components/PageWrapper";

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-karla",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="flex min-h-screen">
          <Sidebar />

          <Navbar />
          <PageWrapper children={children}></PageWrapper>
        </div>
  );
}
