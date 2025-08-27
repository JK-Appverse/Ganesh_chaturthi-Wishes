
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export function AdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.atOptions = window.atOptions || {
        'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      });
    } catch (e) {
      console.error('Ad script error', e);
    }
  }, []);

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
