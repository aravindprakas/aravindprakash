import React, { useEffect, useRef } from 'react';

function ParallaxHeader() {
  const headerRef = useRef(null);
  const nameRef = useRef(null);
  const professionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (nameRef.current && professionRef.current) {
        nameRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        professionRef.current.style.transform = `translateY(${scrollY * 0.6}px)`;
        professionRef.current.style.opacity = `${1 - scrollY / 600}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={headerRef}
      className="relative h-screen bg-gradient-to-br from-black to-black/90 text-white overflow-hidden flex flex-col items-center justify-center"
    >
      <h1
        ref={nameRef}
        className="font-beautiful text-5xl sm:text-7xl md:text-8xl font-bold transition-transform duration-300 ease-out"
      >
        Aravind Prakash G
      </h1>
      <p
        ref={professionRef}
        className="text-xl sm:text-2xl md:text-3xl mt-4 text-gray-300 transition-opacity duration-300"
      >
        Frontend Developer
      </p>
    </div>
  );
}

export default ParallaxHeader;
