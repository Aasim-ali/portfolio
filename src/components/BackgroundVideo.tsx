import { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import localforage from 'localforage';

export default memo(function BackgroundVideo({
  setLoading
} : {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const VIDEO_KEY = "bg-video";
  const VIDEO_PATH = "/video/bg-video.mp4";

  useGSAP(() => {
    const loadVideo = async () => {
      try {
        let videoBlob: Blob | null = await localforage.getItem(VIDEO_KEY);

        if (!videoBlob) {
          console.log("Downloading video for first time...");
          const response = await fetch(VIDEO_PATH);
          videoBlob = await response.blob();
          // Store it for future visits
          await localforage.setItem(VIDEO_KEY, videoBlob);
        } else {
          console.log("Video loaded from IndexedDB!");
        }

        // Create a local URL for the blob
        const blobUrl = URL.createObjectURL(videoBlob);
        setVideoSrc(blobUrl);
      } catch (err) {
        console.error("IndexedDB Error:", err);
        setVideoSrc(VIDEO_PATH); // Fallback to direct path
      }
    };

    loadVideo();

    // Cleanup Blob URL when component unmounts to save memory
    return () => {
      if (videoSrc.startsWith("blob:")) URL.revokeObjectURL(videoSrc);
    };
  }, []);


  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    setLoading(false);
    const setupTimeline = () => {
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,   // 👈 body ko trigger banao, video ko nahi
          start: "top top",
          endTrigger: "#end",
          end: "bottom bottom",
          scrub: 1,                 // 👈 0.5 laggy lagta hai, 1 better hai
        }
      });
    };

    // metadata already loaded ho chuka ho toh seedha setup karo
    if (video.readyState >= 1) {
      setupTimeline();
    } else {
      video.addEventListener('canplaythrough', setupTimeline, { once: true });
    }
  });

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
      <video
        ref={videoRef}
        src="/video/bg-video.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
})