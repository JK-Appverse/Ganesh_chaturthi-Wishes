
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function AdBanner() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    try {
      // @ts-ignore
      if (window.atOptions) return;
      // @ts-ignore
      window.atOptions = {
        'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    } catch (e) {
      console.error('Ad script error', e);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Script
        id="banner-ad-script"
        strategy="lazyOnload"
        src="//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js"
      />
    </>
  );
}
