import { Metadata } from "next"
import { headers } from 'next/headers'
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import { Navigation } from "@/components/navigation"
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { config } from '../wagmi.config'
import { cookieToInitialState } from 'wagmi'
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "D_D RPC",
    template: `%s - "D_D RPC"`,
  },
  //chore add real url
  metadataBase: new URL("https://ddrpc.developerdao.com"),
  description: "D_D RPC is a gatweay to Web3 world.",
  keywords: [
    "Developer DAO",
    "Web3",
    "RPC",
    "Gateway",
    "Decentralized",
  ],
  authors: [
    {
      //chore add other authors
      name: "@PSkinnerTech, @vorcigernix",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ddrpc.developerdao.com",
    title: "D_D RPC",
    description: "D_D RPC is a gatweay to Web3 world.",
    siteName: "D_D RPC",
    images: [
      {
        url: "https://ddrpc.developerdao.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "D_D RPC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D_D RPC",
    description: "D_D RPC is a gatweay to Web3 world.",
    images: "https://ddrpc.developerdao.com/og-image.png",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "site.webmanifest",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body
        className={cn(
          "min-h-screen bg-zinc-900 antialiased",
          inter.className
        )}
      >   <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <Providers initialState={initialState}><div>{children}</div></Providers>
        </ThemeProvider></body>

    </html>
  );
}
