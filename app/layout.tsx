import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const anekBangla = localFont({
  src: [
    {
      path: './fonts/AnekBangla-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/AnekBangla-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-anek',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Paper Vault",
  description: "Access Sri Lankan Grade 5 Scholarship, O/L, and A/L past papers at Paper-Vault. Download exam papers to prepare effectively and achieve exam success.",
  icons: {
    icon: "/book.ico", 
    shortcut: "/book.ico", 
    apple: "/book.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anekBangla.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
