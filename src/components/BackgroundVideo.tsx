import { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default memo(function BackgroundVideo({
  setLoading
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const setupTimeline = () => {
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          endTrigger: "#end",
          end: "bottom bottom",
          scrub: 1,
        }
      });
      // Video fully ready hai — ab loader hatao
      setLoading(false);
    };

    // Agar video already fully buffered hai toh seedha setup karo
    if (video.readyState >= 4) {
      setupTimeline();
    } else {
      video.addEventListener('canplaythrough', setupTimeline, { once: true });
    }
  });

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
      <video
        ref={videoRef}
        src="/video/ring-bg2.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
})