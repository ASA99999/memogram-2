import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";



const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Memogram — Дурсамжаа гартаа барь",
  description: "Утасны зургаа бодит хэвлэмэл наалт болгон захиал.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body
        className={`${fraunces.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}