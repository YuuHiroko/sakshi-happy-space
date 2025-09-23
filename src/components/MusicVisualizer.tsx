import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  url: string;
  duration: string;
}

const MusicVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Birthday playlist for Sakshi
  const playlist: Song[] = [
    {
      title: "Happy Birthday",
      artist: "Traditional",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
      duration: "0:30"
    },
    {
      title: "Celebration",
      artist: "Kool & The Gang",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
      duration: "3:45"
    },
    {
      title: "Good as Hell",
      artist: "Lizzo",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
      duration: "2:39"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    
    if (!canvas || !audio) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize audio context
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        
        if (!sourceRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
      }
    };

    const draw = () => {
      if (!analyserRef.current || !ctx) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw visualizer
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, `hsl(${i * 2 + Date.now() * 0.01}, 70%, 60%)`);
        gradient.addColorStop(1, `hsl(${i * 2 + Date.now() * 0.01}, 70%, 30%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        // Add glow effect
        ctx.shadowColor = `hsl(${i * 2 + Date.now() * 0.01}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        ctx.shadowBlur = 0;

        x += barWidth + 1;
      }

      // Draw center circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const avgFrequency = dataArray.reduce((a, b) => a + b) / bufferLength;
      const radius = 30 + (avgFrequency / 255) * 50;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 105, 180, ${0.3 + (avgFrequency / 255) * 0.7})`;
      ctx.fill();

      // Draw rotating elements
      const time = Date.now() * 0.001;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time;
        const x = centerX + Math.cos(angle) * (radius + 20);
        const y = centerY + Math.sin(angle) * (radius + 20);
        
        ctx.beginPath();
        ctx.arc(x, y, 5 + (dataArray[i * 4] / 255) * 10, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${i * 45}, 70%, 60%)`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const handlePlay = () => {
      initAudioContext();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      draw();
    };

    audio.addEventListener('play', handlePlay);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentSong].url}
        onEnded={nextSong}
        volume={volume}
      />
      
      {/* Visualizer Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-4">
        {/* Song Info */}
        <div className="text-center mb-4">
          <h3 className="text-white font-semibold text-lg">
            {playlist[currentSong].title}
          </h3>
          <p className="text-white/70">
            {playlist[currentSong].artist} • {playlist[currentSong].duration}
          </p>
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.button
            onClick={prevSong}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={togglePlay}
            className="p-3 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </motion.button>
          
          <motion.button
            onClick={nextSong}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center justify-center gap-2">
          <Volume2 className="w-4 h-4 text-white" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-pink-500"
          />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-white/50 text-sm">
        🎵 Sakshi's Birthday Playlist
      </div>
    </div>
  );
};

export default MusicVisualizer;