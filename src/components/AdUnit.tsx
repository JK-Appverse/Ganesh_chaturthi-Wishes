'use client';

import { useEffect, useRef } from 'react';

const AdUnit = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous ads
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scriptConfig = document.createElement('script');
    scriptConfig.type = 'text/javascript';
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = '//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js';
    
    container.appendChild(scriptConfig);
    container.appendChild(scriptInvoke);

    // Cleanup function
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="flex justify-center items-center w-full my-4"></div>;
};

export default AdUnit;
