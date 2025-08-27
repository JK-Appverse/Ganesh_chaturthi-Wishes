'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (adContainerRef.current) {
        // Clear the placeholder text before injecting the ad script
        adContainerRef.current.innerHTML = '';
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        
        // Using innerHTML for the options script
        script.innerHTML = `
            atOptions = {
              'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
        `;
        adContainerRef.current.appendChild(script);

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = '//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js';
        
        adContainerRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className="ad-banner-container flex justify-center items-center my-4 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-md" 
      style={{ minHeight: '50px', width: '320px', margin: '1rem auto' }}
    >
      विज्ञापन लोड हो रहा है...
    </div>
  );
};

export default AdBanner;
