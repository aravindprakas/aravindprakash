import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <Spline scene="https://prod.spline.design/6sD62qNqAA41sC0d/scene.splinecode" />
    </main>
  );
}
{/* <Spline className='absolute bg-black h-full w-screen z- left-0 top-0'
        scene="https://prod.spline.design/Q8UPV3XCnIf-7KTD/scene.splinecode"
        /> */}