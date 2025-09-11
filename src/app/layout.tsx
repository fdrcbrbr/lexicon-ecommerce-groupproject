import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import Inter da Google Fonts
const inter = Inter({
  variable: "--font-inter", // Questa variabile CSS viene usata in globals.css
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"], // Specifica i pesi che usi
});

export const metadata: Metadata = {
  title: "Shop.co",
  description: "Find clothes that match your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}