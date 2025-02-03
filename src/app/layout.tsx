import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { AuthProvider } from "@/context";
import { Navbar } from "@/components/common/navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <title>CWJ Blogs</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
            <Navbar />
            {children}
            <Toaster />
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
