import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc } from 'lucide-react';
import { invitationData } from '../../data/invitationData';

const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 text-red-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface MusicPlayerProps {
  autoPlayTriggered: boolean;
}

// Helper to extract 11-char YouTube video ID from various URL formats
export function extractYouTubeId(urlOrId?: string): string {
  if (!urlOrId) return 'W-TE_Ys4iwM';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return 'W-TE_Ys4iwM';
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string,
        config: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
  loadVideoById: (videoId: string) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeEngine, setActiveEngine] = useState<'youtube' | 'audio' | 'synth'>('youtube');
  const [ytReady, setYtReady] = useState<boolean>(false);
  const [customYtInput, setCustomYtInput] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const timeUpdateInterval = useRef<number | null>(null);

  const synthContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const targetYtId = extractYouTubeId(invitationData.music.youtubeUrlOrId);

  // Initialize YouTube Iframe API
  useEffect(() => {
    // Check if script already inserted
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      try {
        ytPlayerRef.current = new window.YT.Player('luxury-yt-player', {
          height: '10',
          width: '10',
          videoId: targetYtId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: targetYtId,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(volume * 100);
              setYtReady(true);
            },
            onStateChange: (event) => {
              if (window.YT && event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setActiveEngine('youtube');
              } else if (window.YT && event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (window.YT && event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo(); // loop
              }
            },
            onError: () => {
              console.warn('YouTube player blocked, switching to direct audio stream');
              switchToHtmlAudio();
            },
          },
        });
      } catch (e) {
        console.warn('YouTube init exception:', e);
        switchToHtmlAudio();
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    };
  }, [targetYtId]);

  // Track time updates
  useEffect(() => {
    if (isPlaying) {
      timeUpdateInterval.current = window.setInterval(() => {
        if (activeEngine === 'youtube' && ytPlayerRef.current) {
          try {
            const cur = ytPlayerRef.current.getCurrentTime() || 0;
            const dur = ytPlayerRef.current.getDuration() || 0;
            setCurrentTime(cur);
            setDuration(dur);
          } catch {
            // ignore
          }
        }
      }, 500);
    } else {
      if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    }
    return () => {
      if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    };
  }, [isPlaying, activeEngine]);

  const switchToHtmlAudio = () => {
    setActiveEngine('audio');
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => startRomanticSynthFallback());
    }
  };

  // Web Audio Canon in D / Beautiful in White chord fallback
  const startRomanticSynthFallback = () => {
    setActiveEngine('synth');
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = synthContextRef.current || new AudioCtx();
      synthContextRef.current = ctx;

      if (ctx.state === 'suspended') ctx.resume();

      // Canon in D / Beautiful in White chords
      const chords = [
        [293.66, 369.99, 440.0],
        [277.18, 329.63, 440.0],
        [246.94, 293.66, 369.99],
        [185.00, 220.00, 277.18],
        [196.00, 246.94, 293.66],
        [146.83, 220.00, 293.66],
        [196.00, 246.94, 392.00],
        [220.00, 277.18, 440.00],
      ];
      let step = 0;

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      const playChord = () => {
        if (!synthContextRef.current || isMuted) return;
        const now = ctx.currentTime;
        const currentChord = chords[step % chords.length];
        step++;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.05 * volume, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 4);
        });
      };

      playChord();
      synthIntervalRef.current = window.setInterval(playChord, 3800);
      setIsPlaying(true);
    } catch {
      // ignore
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthContextRef.current && synthContextRef.current.state === 'running') {
      synthContextRef.current.suspend();
    }
  };

  // Play audio upon invitation open
  useEffect(() => {
    if (autoPlayTriggered) {
      if (invitationData.music.mode === 'audio') {
        switchToHtmlAudio();
      } else if (ytReady && ytPlayerRef.current) {
        try {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
          setActiveEngine('youtube');
        } catch {
          switchToHtmlAudio();
        }
      } else {
        switchToHtmlAudio();
      }
    }
  }, [autoPlayTriggered, ytReady]);

  const togglePlay = () => {
    if (isPlaying) {
      if (activeEngine === 'youtube' && ytPlayerRef.current) {
        ytPlayerRef.current.pauseVideo();
      } else if (activeEngine === 'audio' && audioRef.current) {
        audioRef.current.pause();
      } else {
        stopRomanticSynth();
      }
      setIsPlaying(false);
    } else {
      if (activeEngine === 'youtube' && ytPlayerRef.current) {
        try {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        } catch {
          switchToHtmlAudio();
        }
      } else if (activeEngine === 'audio' && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => startRomanticSynthFallback());
      } else {
        startRomanticSynthFallback();
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (activeEngine === 'youtube' && ytPlayerRef.current) {
      if (nextMuted) ytPlayerRef.current.mute();
      else ytPlayerRef.current.unMute();
    } else if (activeEngine === 'audio' && audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (activeEngine === 'youtube' && ytPlayerRef.current) {
      ytPlayerRef.current.setVolume(val * 100);
    } else if (activeEngine === 'audio' && audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (activeEngine === 'youtube' && ytPlayerRef.current) {
      ytPlayerRef.current.seekTo(target, true);
    } else if (activeEngine === 'audio' && audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const handleApplyCustomYt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYtInput.trim()) return;
    const newId = extractYouTubeId(customYtInput);
    if (ytPlayerRef.current) {
      ytPlayerRef.current.loadVideoById(newId);
      setActiveEngine('youtube');
      setIsPlaying(true);
    }
    setCustomYtInput('');
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Hidden YouTube Iframe Container */}
      <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 pointer-events-none opacity-0 overflow-hidden">
        <div id="luxury-yt-player" />
      </div>

      {/* Direct HTML5 Audio Fallback */}
      <audio
        ref={audioRef}
        src={invitationData.music.audioUrl}
        preload="auto"
        loop
        onTimeUpdate={() => {
          if (activeEngine === 'audio' && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
      />

      {/* Floating Controller Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none">
        
        {/* Expanded Controller Panel */}
        {isExpanded && (
          <div className="mb-3 p-4 sm:p-5 rounded-2xl backdrop-blur-2xl bg-obsidian/95 border border-gold-antique/40 shadow-2xl w-72 sm:w-80 text-ivory-warm animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-full border border-gold-champagne/60 flex items-center justify-center bg-burgundy-deep/50 shadow-gold-glow flex-shrink-0">
                <Disc className={`w-5 h-5 text-gold-champagne ${isPlaying ? 'animate-spin-slow' : ''}`} />
              </div>

              <div className="overflow-hidden flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-gold-champagne font-bold px-1.5 py-0.5 rounded bg-gold-antique/20 border border-gold-champagne/30">
                    {activeEngine === 'youtube' ? 'YouTube Music' : 'Acoustic Master'}
                  </span>
                </div>
                <p className="text-sm font-italiana font-bold text-[#F7EACD] truncate mt-0.5">
                  {invitationData.music.title}
                </p>
                <p className="text-[10px] text-ivory-muted/80 truncate font-sans">
                  {invitationData.music.artist}
                </p>
              </div>
            </div>

            {/* Track Progress Slider */}
            <div className="my-2.5">
              <input
                type="range"
                min={0}
                max={duration || 210}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-burgundy-deep rounded-lg appearance-none cursor-pointer accent-gold-champagne"
                aria-label="Seek track position"
              />
              <div className="flex justify-between text-[9px] text-ivory-muted/70 font-sans mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 210)}</span>
              </div>
            </div>

            {/* Volume row */}
            <div className="flex items-center gap-3 pt-2 border-t border-gold-antique/20">
              <button
                onClick={toggleMute}
                className="text-gold-champagne hover:text-gold-light focus:outline-none"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-burgundy-deep rounded-lg appearance-none cursor-pointer accent-gold-champagne"
                aria-label="Volume slider"
              />
            </div>

            {/* Paste custom YouTube link feature */}
            <form onSubmit={handleApplyCustomYt} className="mt-3 pt-2.5 border-t border-gold-antique/20">
              <label className="block text-[9px] tracking-wider uppercase text-gold-champagne/80 font-sans mb-1">
                Request YouTube Song (URL or ID)
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Paste YouTube Link or ID..."
                  value={customYtInput}
                  onChange={(e) => setCustomYtInput(e.target.value)}
                  className="flex-1 px-2.5 py-1 text-xs bg-black/60 rounded border border-gold-antique/30 text-ivory-warm placeholder:text-neutral-500 focus:outline-none focus:border-gold-champagne"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-gold-champagne/20 hover:bg-gold-champagne/40 border border-gold-champagne/50 text-[10px] text-gold-light font-sans uppercase font-bold transition-colors"
                >
                  Play
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Circular Floating Main Pill Button */}
        <div className="flex items-center gap-2">
          {/* Animated Wave Pill */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md bg-obsidian/85 border border-gold-antique/40 shadow-gold-glow hover:border-gold-champagne transition-all"
            title="Music settings & YouTube song change"
          >
            {activeEngine === 'youtube' ? (
              <YouTubeIcon className="w-4 h-4 text-red-400" />
            ) : (
              <Music className="w-3.5 h-3.5 text-gold-champagne" />
            )}
            <div className="flex items-end gap-[3px] h-3.5">
              <span className={`w-[2.5px] bg-gold-champagne rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
              <span className={`w-[2.5px] bg-gold-light rounded-full transition-all duration-300 ${isPlaying ? 'h-2 animate-bounce' : 'h-1'}`} />
              <span className={`w-[2.5px] bg-gold-champagne rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
              <span className={`w-[2.5px] bg-gold-dark rounded-full transition-all duration-300 ${isPlaying ? 'h-1.5 animate-bounce' : 'h-1'}`} />
            </div>
            <span className="text-[10px] tracking-wider uppercase text-ivory-warm font-sans pl-1">
              {isPlaying ? 'Beautiful in White' : 'Music Paused'}
            </span>
          </div>

          {/* Main Action Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full relative flex items-center justify-center bg-gradient-to-br from-gold-antique via-burgundy-deep to-obsidian border-2 border-gold-champagne shadow-gold-glow hover:scale-105 active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne group cursor-pointer"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            <span className="absolute inset-0 rounded-full border border-gold-light/40 animate-ping opacity-25 pointer-events-none" />
            {isPlaying ? (
              <Pause className="w-5 h-5 text-gold-light fill-gold-light group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-5 h-5 text-gold-light fill-gold-light translate-x-0.5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

      </div>
    </>
  );
};
