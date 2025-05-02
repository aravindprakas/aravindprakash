import React, { useEffect, useRef, useState } from 'react';
import '@fontsource/league-spartan';
// import backgroundImage from '../../assets/Header-background.jpg';

function ParallaxHeader() {
  const headerRef = useRef(null);
  const nameRef = useRef(null);
  const professionRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight; // full viewport height
  
      if (headerRef.current) {
        const opacity = Math.max(1 - scrollY / maxScroll, 0);
        const blur = Math.min((scrollY / maxScroll) * 10, 10); // max 10px blur
  
        headerRef.current.style.opacity = opacity;
        headerRef.current.style.backdropFilter = `blur(${blur}px)`;
        headerRef.current.style.webkitBackdropFilter = `blur(${blur}px)`; // Safari support
      }
  
      if (nameRef.current && professionRef.current) {
        nameRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        professionRef.current.style.transform = `translateY(${scrollY * 0.6}px)`;
        professionRef.current.style.opacity = `${1 - scrollY / 400}`;
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (nameRef.current && professionRef.current) {
        nameRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        professionRef.current.style.transform = `translateY(${scrollY * 0.6}px)`;
        professionRef.current.style.opacity = `${1 - scrollY / 100}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={headerRef}
      className="relative z-10 top-0 left-0 w-full h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center transition-opacity duration-1000"
      // style={{ opacity: loaded ? 1 : 0 , backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="fixed inset-0 bg-black opacity-40 z-10" />
      </div>

      <div className="fixed z-20 text-center">
        <h1
          ref={nameRef}
          className={`text-5xl sm:text-7xl md:text-8xl font-bold transform transition-transform duration-700 ease-out tracking-wider ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Aravind Prakash G
        </h1>
        <p
          ref={professionRef}
          className={`text-xl sm:text-2xl md:text-3xl mt-4 text-gray-300 transition-all duration-700 ease-out ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Frontend Developer
        </p>
      </div>
    </div>
  );
}

export default ParallaxHeader;
