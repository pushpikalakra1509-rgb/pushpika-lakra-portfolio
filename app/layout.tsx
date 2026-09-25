import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pushpika Lakra — AI & Data Science",
  description:
    "Portfolio of Pushpika Lakra — MSc AI & Data Science student, Computer Science graduate, and aspiring AI & Data professional.",
  keywords: [
    "Pushpika Lakra",
    "AI",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Python",
    "SQL",
    "Generative AI",
    "Data Analytics",
    "Portfolio",
  ],
  authors: [{ name: "Pushpika Lakra" }],
  creator: "Pushpika Lakra",
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