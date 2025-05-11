import React, { useEffect, useRef } from 'react';
import backgroundImage from '../../assets/Space.jpg';

function FourWords() {
  const elementsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closest = null;
      let closestDistance = Infinity;

      elementsRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - elCenter);

        if (distance < closestDistance) {
          closest = el;
          closestDistance = distance;
        }
      });

      elementsRef.current.forEach((el) => {
        el.classList.add('blur');
        el.classList.remove('filter-none');
      });

      if (closest) {
        closest.classList.remove('blur');
        closest.classList.add('filter-none');
      }
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const words = ['Interface Design', 'User Experience', 'Accessibility', 'Optimization'];

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center gap-5 px-4 py-24 sm:py-40 md:py-60 bg-black text-gray-300"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {words.map((word, i) => (
        <h1
          key={i}
          ref={(el) => (elementsRef.current[i] = el)}
          className="blur-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl blur transition-all duration-500"
        >
          {word}
        </h1>
      ))}
    </div>
  );
}

export default FourWords;
  