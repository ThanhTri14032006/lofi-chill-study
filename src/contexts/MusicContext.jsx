import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const dispatch = useDispatch();
  const volumeData = useSelector((state) => state.volumeState);
  const musicPlayingData = useSelector((state) => state.musicPlayingState);
  const moodData = useSelector((state) => state.moodState);
  
  const { volumeValue } = volumeData;
  const { isDefaultMusicPlaying } = musicPlayingData;
  const { moodMode } = moodData;

  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(isDefaultMusicPlaying);
  const [isPlaylistMode, setIsPlaylistMode] = useState(false);

  // Import song data
  const { chill, jazzy, sleep } = require('../data/songData.jsx');
  
  const getCurrentPlaylist = () => {
    switch (moodMode) {
      case 'chill': return chill;
      case 'jazzy': return jazzy;
      case 'sleep': return sleep;
      default: return chill;
    }
  };

  const currentPlaylist = getCurrentPlaylist();

  // Sync with Redux state
  useEffect(() => {
    setIsPlaying(isDefaultMusicPlaying);
  }, [isDefaultMusicPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && isDefaultMusicPlaying && !isPlaylistMode) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
      audioRef.current.volume = volumeValue / 100;
    }
  }, [isPlaying, isDefaultMusicPlaying, volumeValue, isPlaylistMode]);

  // Handle track change
  useEffect(() => {
    if (audioRef.current && isPlaying && isDefaultMusicPlaying && !isPlaylistMode) {
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex, isPlaying, isDefaultMusicPlaying, isPlaylistMode]);

  // Auto advance to next track
  useEffect(() => {
    if (audioRef.current && !isPlaylistMode) {
      const handleEnded = () => {
        if (isDefaultMusicPlaying) {
          setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.length);
        }
      };
      
      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [isDefaultMusicPlaying, isPlaylistMode, currentPlaylist.length]);

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + currentPlaylist.length) % currentPlaylist.length);
  };

  const startPlaylistMode = () => {
    setIsPlaylistMode(true);
    dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: false });
  };

  const stopPlaylistMode = () => {
    setIsPlaylistMode(false);
    dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: true });
  };

  const value = {
    audioRef,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    isPlaylistMode,
    setIsPlaylistMode,
    currentPlaylist,
    playPause,
    nextTrack,
    prevTrack,
    startPlaylistMode,
    stopPlaylistMode,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio 
        ref={audioRef} 
        src={currentPlaylist[currentTrackIndex]?.src} 
        loop={false}
      />
    </MusicContext.Provider>
  );
};
