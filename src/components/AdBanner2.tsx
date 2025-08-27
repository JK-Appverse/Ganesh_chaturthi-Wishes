'use client';

import { useEffect } from 'react';

const AdBanner2 = () => {
  useEffect(() => {
    const container = document.getElementById('container-fa891ecb3a8f703fb88dc290542b4046');
    if (container && container.children.length === 0) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27517644.profitableratecpm.com/fa891ecb3a8f703fb88dc290542b4046/invoke.js';
      container.appendChild(script);
    }
  }, []);

  return <div id="container-fa891ecb3a8f703fb88dc290542b4046" className="z-20 mt-4 flex justify-center"></div>;
};

export default AdBanner2;
