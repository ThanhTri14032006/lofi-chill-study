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
    // Kiểm tra nếu đang ở chế độ playlist, không thay đổi trạng thái
    if (isPlaylistMode) {
      console.log("Đang ở chế độ playlist, không thay đổi trạng thái phát nhạc mặc định");
      return;
    }
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
    
    // Đảm bảo âm thanh mặc định được phát lại sau khi thoát chế độ playlist
    setTimeout(() => {
      if (audioRef.current && !isPlaylistMode) {
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error("Lỗi khi phát lại nhạc mặc định:", error);
        });
      }
    }, 300); // Đợi một chút để đảm bảo các state đã được cập nhật
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

  // Cập nhật đường dẫn âm thanh khi thay đổi bài hát
  useEffect(() => {
    if (audioRef.current && currentPlaylist[currentTrackIndex]) {
      const fullPath = process.env.PUBLIC_URL + currentPlaylist[currentTrackIndex]?.src;
      console.log("MusicContext: Cập nhật đường dẫn âm thanh:", fullPath);
      audioRef.current.src = fullPath;
      
      if (isPlaying && !isPlaylistMode) {
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error("MusicContext: Lỗi khi phát nhạc:", error);
        });
      }
    }
  }, [currentTrackIndex, currentPlaylist, isPlaying, isPlaylistMode]);
  
  // Tự động phát nhạc khi component được mount
  useEffect(() => {
    let isMounted = true;
    
    // Đợi một khoảng thời gian để đảm bảo component đã mount hoàn toàn
    const timer = setTimeout(() => {
      if (isMounted && audioRef.current && isDefaultMusicPlaying && !isPlaylistMode) {
        console.log("Đang cố gắng tự động phát nhạc khi khởi tạo...");
        
        // Đảm bảo đường dẫn âm thanh đã được thiết lập
        if (!audioRef.current.src && currentPlaylist[currentTrackIndex]) {
          const fullPath = process.env.PUBLIC_URL + currentPlaylist[currentTrackIndex]?.src;
          audioRef.current.src = fullPath;
        }
        
        // Phát nhạc với xử lý lỗi
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Tự động phát nhạc thành công!");
            })
            .catch(error => {
              // Lỗi AbortError thường xảy ra khi có nhiều yêu cầu phát cùng lúc
              // Không cần xử lý đặc biệt vì các useEffect khác sẽ xử lý việc phát nhạc
              console.log("Thông báo: Không thể tự động phát nhạc, người dùng cần nhấn nút play.", error);
            });
        }
      }
    }, 2000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // Empty dependency array để chỉ chạy một lần khi mount

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio 
        ref={audioRef} 
        preload="auto"
        loop={false}
        onError={(e) => console.error("MusicContext: Lỗi audio:", e)}
      />
    </MusicContext.Provider>
  );
};
