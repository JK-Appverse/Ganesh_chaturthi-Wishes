'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (adContainerRef.current && adContainerRef.current.children.length === 0) {
        const scriptOptions = document.createElement('script');
        scriptOptions.type = 'text/javascript';
        scriptOptions.innerHTML = `
            atOptions = {
              'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
        `;
        adContainerRef.current.appendChild(scriptOptions);

        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = '//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js';
        adContainerRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className="ad-banner-container flex justify-center items-center my-4" 
      style={{ minHeight: '50px', width: '320px', margin: '0 auto' }}
    />
  );
};

export default AdBanner;
