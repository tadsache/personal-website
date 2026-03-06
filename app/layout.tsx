import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tade Heldt",
  description: "i write code. i run loops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
