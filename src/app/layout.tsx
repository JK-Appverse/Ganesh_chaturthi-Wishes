import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Noto_Serif_Devanagari } from 'next/font/google';
import Script from 'next/script';

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
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", notoSerifDevanagari.variable)}>
        {children}
        <Toaster />
        <Script
            id="native-banner-ad"
            strategy="lazyOnload"
        >{`
          (function(w, d, o, s, id) {
              if (d.getElementById(id)) return;
              var js = d.createElement(s);
              js.id = id;
              js.src = o;
              js.async = true;
              js.setAttribute('data-cfasync', 'false');
              d.getElementsByTagName('head')[0].appendChild(js);
          })(window, document, '//pl27517644.profitableratecpm.com/fa891ecb3a8f703fb88dc290542b4046/invoke.js', 'script', 'container-fa891ecb3a8f703fb88dc290542b4046-invoker');
        `}</Script>
      </body>
    </html>
  );
}
