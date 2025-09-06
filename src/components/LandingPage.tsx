import { FaDownload, FaGithub } from "react-icons/fa6";
import { Fragment, useRef } from "react";
import EmojiFollower from "./EmojiFollower";
import testimonials from "../data/testimonials.json";
import emojis from "../data/emojis.json";

function LandingPage() {
  const looped = [...testimonials, ...testimonials];
  const baseLength = (testimonials as any[]).length;
  const emojisBaseRef = useRef<string[] | null>(null);
  if (!emojisBaseRef.current) {
    const total = (emojis as any[]).length;
    emojisBaseRef.current = Array.from({ length: baseLength }, () => {
      const idx = Math.floor(Math.random() * total);
      return (emojis as any[])[idx] as string;
    });
  }
  const emojisLooped = [
    ...(emojisBaseRef.current as string[]),
    ...(emojisBaseRef.current as string[]),
  ];
  return (
    <div className='w-screen min-h-screen bg-[#FAFAF7] [background-image:radial-gradient(circle,_rgba(0,0,0,0.2)_1px,_transparent_1px)] [background-size:40px_40px] [background-position:0_0]'>
      <EmojiFollower />
      <div className='flex w-full h-full min-h-screen items-center justify-center xl:gap-56 md:gap-20 px-8 xs:px-12 md:px-0'>
        <div className='flex flex-col w-full xl:max-w-[38rem] md:max-w-xl items-start gap-6'>
            <div className='flex flex-col items-start gap-3'>
              <div className='flex items-center'>
                <h1 className='text-3xl font-bold tracking-wide'>FujiMoji</h1>
                <img src='/fujimoji-logo.png' alt='FujiMoji Logo' className='w-14 h-14' />
              </div>
                <h2 className='text-xl font-medium'>The sweetest way to express yourself on macOS</h2>
            </div>
          <div className='my-2 w-full'>
            <div className='rounded-xl overflow-hidden shadow-lg border-2 border-black'>
              <video
                className='w-full h-auto block'
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src='/fujimoji-demo.webm' type='video/webm' />
              </video>
            </div>
          </div>
          <div className='flex w-full gap-8'>
            <button 
              className='flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black border-2 border-black font-semibold shadow-button active:shadow-none active:translate-x-1 active:translate-y-1'
              onClick={() => {
                setTimeout(() => {
                  window.location.href = 'https://github.com/RickLiu1203/FujiMoji/releases/download/v2.0/FujiMoji.dmg';
                }, 150);
              }}
            >
              <FaDownload />
              MacOS 14.0+
            </button>
            <button 
              className='flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black border-2 border-black font-semibold shadow-button active:shadow-none active:translate-x-1 active:translate-y-1'
              onClick={() => {
                setTimeout(() => {
                  window.open('https://github.com/RickLiu1203/FujiMoji', '_blank');
                }, 150);
              }}
            >
              <FaGithub />
              GitHub
            </button>
          </div>
          <div className='w-full font-semibold'>
            <p>Made With 💜️ By Rick Liu</p>
          </div>
        </div>
        <div className='side-carousel-inline'>
          <div className='side-carousel-mask'>
            <div className='side-carousel-track reverse'>
              {looped.map((t, idx) => (
                <Fragment key={`item-${idx}`}>
                  <div className='testimonial-card'>
                    <p>“{t.quote}”</p>
                    <div className='testimonial-author'>— {t.author}</div>
                  </div>
                  <div className='flex items-center justify-center'>
                    <span className='flex items-center justify-center text-xl bg-white rounded-full border border-black w-10 h-10 shadow-md'>
                      {emojisLooped[idx]}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage