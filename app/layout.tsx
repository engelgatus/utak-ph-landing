import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Load JetBrains Mono
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utak POS Landing | Engel Gatus",
  description: "Vibecoder submission for Utak POS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the font variable globally */}
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-black text-green-500`}>
        {children}
      </body>
    </html>
  );
}
