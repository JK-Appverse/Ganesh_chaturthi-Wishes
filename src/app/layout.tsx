import type {Metadata} from 'next';
import { Inter, Alegreya } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const alegreya = Alegreya({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-alegreya' });


export const metadata: Metadata = {
  title: 'शुभ दिवाली - आपकी व्यक्तिगत शुभकामनाएँ',
  description: 'AI की मदद से व्यक्तिगत दिवाली शुभकामनाएँ बनाएँ और साझा करें।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, alegreya.variable)}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
