import { Karla } from "next/font/google";
import "../../globals.css";
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
    <html lang="en">
      <body className={karla.className}>
        <div className="flex min-h-screen">
          <PageWrapper children={children}></PageWrapper>
        </div>
      </body>
    </html>
  );
}
