import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import {config} from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {redirect} from "next/navigation";
import {cn} from "@/lib/utils"
import {Toaster} from "@/components/ui/toaster";

config.autoAddCss = false;

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans'
})

export const metadata: Metadata = {
  title: "Vip English",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
    return (
    <html lang="en">
      <body  cz-shortcut-listen="true" className={cn("min-h-screen bg-background font-sans antialiased")}>
            {children}
      <Toaster />
      </body>
    </html>
  );
}
