'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (adContainerRef.current) {
        adContainerRef.current.innerHTML = `
          <script type="text/javascript">
            atOptions = {
              'key' : '7dbc62c8ffa684dad3b4c20f4bb0654d',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/7dbc62c8ffa684dad3b4c20f4bb0654d/invoke.js"></script>
        `;
    }
  }, []);

  return <div ref={adContainerRef} className="ad-banner-container flex justify-center items-center my-4" style={{ minHeight: '50px' }}></div>;
};

export default AdBanner;
