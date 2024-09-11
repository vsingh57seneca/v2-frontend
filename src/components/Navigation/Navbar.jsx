import React, { useEffect, useState } from 'react'
import Mobile from './Mobile';
import Desktop from './Desktop';

const Navbar = () => {
  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== 'undefined') {
        setDeviceWidth(window.innerWidth);
      }
    };

    // Update width on initial render
    updateWidth();

    // Update width on window resize
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className='w-full h-full'>
      {deviceWidth <= 1023 ? <Mobile /> : <Desktop />}
    </div>
  )
}

export default Navbar