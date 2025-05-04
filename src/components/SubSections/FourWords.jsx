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
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5 py-60 text-center px-4 bg-black text-gray-300" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' , backgroundOpacity: '0.5'}}>
      {words.map((word, i) => (
        <h1
          key={i}
          ref={(el) => (elementsRef.current[i] = el)}
          className="blur-text text-4xl sm:text-6xl md:text-7xl lg:text-9xl blur transition-all duration-500"
        >
          {word}
        </h1>
      ))}
    </div>
  );
}

export default FourWords;
