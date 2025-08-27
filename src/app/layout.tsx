import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Noto_Serif_Devanagari } from 'next/font/google';

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-serif-devanagari',
});

export const metadata: Metadata = {
  title: 'Ganesh Wishes Generator',
  description: 'Create personalized Ganesh Chaturthi greetings for your loved ones.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", notoSerifDevanagari.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
