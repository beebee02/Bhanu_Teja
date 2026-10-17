import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = `${process.env.PUBLIC_URL || '/Bhanu_Teja'}/ambient.mp3`;

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play error:', err));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const startAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    };

    window.addEventListener('start-ambient-audio', startAudio);

    return () => {
      window.removeEventListener('start-ambient-audio', startAudio);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-2 sm:right-3 z-50">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        className="w-12 h-12 rounded-full bg-[#1a1a1a]/90 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 hover:border-white/30 shadow-2xl cursor-pointer"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#1DB954]" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/60" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;