'use client';

import { useEffect } from 'react';

const AdBanner2 = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl27517644.profitableratecpm.com/fa891ecb3a8f703fb88dc290542b4046/invoke.js';
    
    const container = document.getElementById('container-fa891ecb3a8f703fb88dc290542b4046');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Cleanup the script when the component unmounts
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return <div id="container-fa891ecb3a8f703fb88dc290542b4046" className="z-20 mt-4"></div>;
};

export default AdBanner2;
