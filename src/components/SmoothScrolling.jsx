import React, { useEffect, useRef } from 'react';

function SmoothScrollWrapper({ children }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let current = 0;
    let target = 0;
    const ease = 0.1;

    const container = scrollContainerRef.current;

    const updateScroll = () => {
      target = window.scrollY;
      current += (target - current) * ease;

      container.style.transform = `translateY(-${current}px)`;
      requestAnimationFrame(updateScroll);
    };

    const setBodyHeight = () => {
      document.body.style.height = `${container.getBoundingClientRect().height}px`;
    };

    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);

    requestAnimationFrame(updateScroll);

    return () => {
      window.removeEventListener('resize', setBodyHeight);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="fixed top-0 left-0 w-full will-change-transform"
    >
      {children}
    </div>
  );
}

export default SmoothScrollWrapper;
