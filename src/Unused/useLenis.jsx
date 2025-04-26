import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'; // Import Lenis

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      // Cleanup when the component unmounts
      lenis.destroy();
    };
  }, []);
}

export default useLenis;