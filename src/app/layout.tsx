import "./globals.css";
import Head from "next/head";
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
// import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mentor AI",
  description: "Learn with AI-Powered Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: dark,
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
      }}
    >
      <html lang="en">
        <Head>
          <title>Mentor AI - Learn with AI-Powered Games</title>
          <meta name="description" content="Mentor AI: Personalized skill learning through engaging AI-generated games. Level up your skills in a fun and interactive way." />
          <link rel="icon" href="/favicon.ico" /> {/* Make sure to have a favicon.ico in your public folder */}
          {/* Inter Font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
