import React, { useEffect } from 'react';

const Preloader: React.FC = () => {
  const preloaderRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) return;
    setTimeout(() => {
      preloader.classList.add(
        'animate-[cubic-bezier(0.4,0,0.2,1)_fade-out_500ms_forwards]',
      );
      setTimeout(() => preloader.remove(), 1000);
    }, 150);
  }, []);

  return (
    <div className='absolute min-h-screen w-screen z-40'>
      <div
        ref={preloaderRef}
        className='app-preloader dark:bg-navy-900 fixed z-50 grid h-full w-full place-content-center bg-slate-50'
      >
        <div className='app-preloader-inner relative inline-block h-48 w-48' />
      </div>
    </div>
  );
};

export default Preloader;
