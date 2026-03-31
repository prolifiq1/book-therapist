import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Book Therapist - Discover Your Perfect Read",
    template: "%s | Book Therapist",
  },
  description:
    "Book Therapist matches you with the perfect book based on your personality, mood, and reading preferences. Take our quiz and discover your next great read.",
  keywords: [
    "book recommendations",
    "reading personality",
    "book quiz",
    "personalized reading",
    "book discovery",
  ],
  openGraph: {
    title: "Book Therapist - Discover Your Perfect Read",
    description:
      "Take our personality quiz and get matched with books tailored to who you are.",
    type: "website",
    siteName: "Book Therapist",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
