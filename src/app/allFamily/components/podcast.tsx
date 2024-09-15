import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';
import './podcast.css';

interface PodcastPlayerProps {
  title: string;
  artist: string;
  coverArt: string;
  src: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ title, artist, coverArt, src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="podcast-player shadow-sm">
      <div className="player-content">
        <div className="track-info">
          <h4>{title}</h4>
          <p>{artist}</p>
        </div>
        <div className="progress-bar">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="controls">
          <button className="control-btn"><FaBackward /></button>
          <button className="play-pause-btn" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-btn"><FaForward /></button>
        </div>
      </div>
      <img src={coverArt} alt={`${title} cover`} className="cover-art" />
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default PodcastPlayer;