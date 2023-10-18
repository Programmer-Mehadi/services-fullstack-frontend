import Providers from "@/lib/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import HeaderSection from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className + " max-w-[1600px] w-full mx-auto"}>
          <HeaderSection />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </html>
    </Providers>
  );
}
