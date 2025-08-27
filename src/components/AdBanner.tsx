'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement | null>(null);
  const adLoadedRef = useRef(false);

  useEffect(() => {
    // Ensure this runs only once and only on the client
    if (adContainerRef.current && !adLoadedRef.current) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      
      // Inline script part
      const atOptions = {
        'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
      script.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;
      
      adContainerRef.current.appendChild(script);

      // External script part
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js';
      
      adContainerRef.current.appendChild(invokeScript);

      // Mark as loaded to prevent re-injection
      adLoadedRef.current = true;
    }
  }, []);

  return <div ref={adContainerRef} className="ad-banner-container flex justify-center items-center" style={{ minHeight: '50px' }}></div>;
};

export default AdBanner;
