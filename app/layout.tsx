import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Smart Chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
