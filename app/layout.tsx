import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Booksure | Explore Books",
  description:
    "Explore books, authors, and stories from around the world.",
  icons: {
  icon: "/assets/logo-fa.webp",
  shortcut: "/assets/logo.webp",
  apple: "/assets/logo.webp",
},
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