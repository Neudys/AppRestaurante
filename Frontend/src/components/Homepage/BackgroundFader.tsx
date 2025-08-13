import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const images = [
  "/img/photo_1.jpeg",
  "/img/photo_2.jpg",
  "/img/photo_3.jpg",
];

type Props = {
  children?: React.ReactNode;
};

const BackgroundFader = ( {children}  : Props   ) => {
  const [index, setIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = index;
      const nextIndex = (index + 1) % images.length;

      if (timelineRef.current) timelineRef.current.kill();

      timelineRef.current = gsap.timeline();

      gsap.set(imageRefs.current[nextIndex], { opacity: 0 });

      timelineRef.current
        .to(imageRefs.current[currentIndex], {
          opacity: 0,
          duration: 4.2,
          ease: "power2.inOut",
        }, 0)
        .to(imageRefs.current[nextIndex], {
          opacity: 1,
          duration: 4.2,
          ease: "power2.inOut",
        }, 0);

      setIndex(nextIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative h-max ">
      <div className="bg-black  h-[100vh] w-[100vw] fixed -z-10" />
      <div className="bg-black/60  h-[100vh] w-[100vw] fixed z-10" />
      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => {
            imageRefs.current[i] = el;
          }}
          src={src}
          className="fixed inset-0 w-full h-full object-cover"
          style={{ opacity: i === 0 ? 1 : 0 }}
        />
      ))}

      <div className="relative h-[100vh] inset-0 z-20 flex items-center justify-center text-white text-4xl font-bold">
        {children}
      </div>
    </div>
  );
};

export default BackgroundFader;
