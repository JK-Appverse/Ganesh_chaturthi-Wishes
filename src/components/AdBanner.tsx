'use client';

import { useEffect, useRef } from 'react';

export function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adRef.current && !adLoaded.current) {
      adLoaded.current = true; // Mark as loaded to prevent re-execution
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        atOptions = {
          'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;

      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = '//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js';

      adRef.current.appendChild(script);
      adRef.current.appendChild(script2);
    }
  }, []);

  return <div ref={adRef} className="flex justify-center items-center my-4 min-h-[50px]"></div>;
}
