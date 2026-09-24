import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pushpika Lakra — AI, Data & What We Can Build",
  description: "Pushpika Lakra — Computer Science graduate exploring Artificial Intelligence, Data Science and practical projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
