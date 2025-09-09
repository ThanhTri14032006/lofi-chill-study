import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './VideoSelector.scss';
import DocumentPanel from '../DocumentPanel/DocumentPanel';
import { useDispatch, useSelector } from 'react-redux';
import { changeVolume } from '../../redux/actions';
import { useMusic } from '../../contexts/MusicContext';

const VideoSelector = ({ setUseCustomVideo, setSelectedVideoPath }) => {
  const dispatch = useDispatch();
  const volumeData = useSelector((state) => state.volumeState);
  const { volumeValue } = volumeData;
  const { 
    currentTrackIndex, 
    setCurrentTrackIndex, 
    isPlaying, 
    setIsPlaying, 
    currentPlaylist, 
    nextTrack, 
    prevTrack, 
    playPause,
    startPlaylistMode,
    stopPlaylistMode 
  } = useMusic();
  
  const [selectedVideo, setSelectedVideo] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCompassOpen, setIsCompassOpen] = useState(false);
  const [googleMusicLink, setGoogleMusicLink] = useState('');
  const [isPlayingGoogleMusic, setIsPlayingGoogleMusic] = useState(false);
  const sidebarRef = useRef(null);
  const currentAudioRef = useRef(null);
  const [activeAudioFile, setActiveAudioFile] = useState(null);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  
  // Phân loại video theo chủ đề với icon
  const categories = [
    { id: 'all', name: 'Tất cả', icon: '🎬' },
    { id: 'day', name: 'Ban ngày', icon: '☀️' },
    { id: 'night', name: 'Ban đêm', icon: '🌙' },
    { id: 'nature', name: 'Thiên nhiên', icon: '🌿' },
    { id: 'city', name: 'Thành phố', icon: '🏙️' },
    { id: 'seasons', name: 'Mùa', icon: '🍂' },
    { id: 'end ', name: 'Video hơi ít sẽ cập nhật thêm sau ^_^',  },
  ];

  const videoOptions = [
    { name: 'Autumn Bedroom', path: '/assets/video/autumn-bedroom-moewalls-com.mp4', category: ['day', 'seasons'] },
    { name: 'Autumn Bedroom Night', path: '/assets/video/autumn-bedroom-nightmoewalls-com.mp4', category: ['night', 'seasons'] },
    { name: 'Black Cat Bus Stop', path: '/assets/video/black-cat-bus-stop-at-dusk-moewalls-com.mp4', category: ['day', 'city'] },
    { name: 'Black Cat Bus Stop Night', path: '/assets/video/black-cat-bus-stop-at-dusk-night-moewalls-com.mp4', category: ['night', 'city'] },
    { name: 'Evening Sky Garden', path: '/assets/video/evening-sky-the-garden-of-words-moewalls-com.mp4', category: ['day', 'nature'] },
    { name: 'Evening Sky Garden Night', path: '/assets/video/evening-sky-the-garden-of-words-night-moewalls-com.mp4', category: ['night', 'nature'] },
    { name: 'Lofi House Cloudy', path: '/assets/video/lofi-house-cloudy-day-1-moewalls-com.mp4', category: ['day', 'city'] },
    { name: 'Lofi House Cloudy Rain', path: '/assets/video/lofi-house-cloudy-day-1-rain-moewalls-com.mp4', category: ['day', 'city', 'nature'] },
    { name: 'Lofi Pink Town', path: '/assets/video/lofi-pink-town-moewalls-com.mp4', category: ['day', 'city'] },
    { name: 'Lofi Van Life', path: '/assets/video/lofi-van-life-moewalls-com.mp4', category: ['day', 'nature'] },
    { name: 'Peaceful Beach', path: '/assets/video/peaceful-beach-moewalls-com.mp4', category: ['day', 'nature'] },
    { name: 'Peaceful Ruins', path: '/assets/video/peaceful-ruins-moewalls-com.mp4', category: ['day', 'nature'] },
    { name: 'Peaceful Ruins Rain', path: '/assets/video/peaceful-ruins-rain-moewalls-com.mp4', category: ['day', 'nature'] },
    { name: 'Seaside Balcony', path: '/assets/video/serene-twilight-from-a-seaside-balcony-moewalls-com.mp4', category: ['day', 'nature'] },
    { name: 'Seaside Balcony Night', path: '/assets/video/serene-twilight-from-a-seaside-balcony-nightmoewalls-com.mp4', category: ['night', 'nature'] },
    { name: 'Sunflowers Summer', path: '/assets/video/sunflowers-summer-days-moewalls-com.mp4', category: ['day', 'nature', 'seasons'] },
    { name: 'Japanese House Sunny', path: '/assets/video/traditional-japanese-house-sunny-day-moewalls-com.mp4', category: ['day', 'city'] },
    { name: 'Truck Camp', path: '/assets/video/truckCampBackground.mp4', category: ['day', 'nature'] },
    { name: 'Winter Christmas Aurora', path: '/assets/video/winter-christmas-house-aurora-moewalls-com.mp4', category: ['night', 'seasons'] },
    { name: 'Winter Night Train', path: '/assets/video/winter-night-train-moewalls-com.mp4', category: ['night', 'city', 'seasons'] },
  ];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeAllSections();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const closeAllSections = () => {
    setIsVideoOpen(false);
    setIsBookOpen(false);
    setIsListOpen(false);
    setIsSettingsOpen(false);
    setIsCompassOpen(false);
    setActiveSection('');
  };
  
  const toggleSection = (section) => {
    if (activeSection === section) {
      closeAllSections();
    } else {
      closeAllSections();
      setActiveSection(section);
      switch(section) {
        case 'video':
          setIsVideoOpen(true);
          break;
        case 'book':
          setIsBookOpen(true);
          break;
        case 'list':
          setIsListOpen(true);
          break;
        case 'settings':
          setIsSettingsOpen(true);
          break;
        case 'compass':
          setIsCompassOpen(true);
          break;
        default:
          break;
      }
    }
  };
  
  const handleVideoSelect = (videoPath) => {
    setSelectedVideo(videoPath);
    setUseCustomVideo(true);
    setSelectedVideoPath(videoPath);
    closeAllSections();
  };
  
  const resetVideo = () => {
    setSelectedVideo('');
    setUseCustomVideo(false);
    closeAllSections();
  }
  
  const playAudio = (audioFile) => {
    const existingAudio = currentAudioRef.current;
    // If the same audio is playing, toggle play/pause
    if (existingAudio && activeAudioFile === audioFile) {
      if (existingAudio.paused) {
        existingAudio.volume = volumeValue / 100;
        existingAudio.play();
      } else {
        existingAudio.pause();
        setActiveAudioFile(null);
        currentAudioRef.current = null;
        // Phát lại nhạc mặc định khi tắt âm thanh thư viện
        dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: true });
      }
      return;
    }

    // Stop any currently playing audio before starting a new one
    if (existingAudio) {
      existingAudio.pause();
      currentAudioRef.current = null;
    }

    const audio = new Audio(`/assets/musics/${audioFile}`);
    audio.volume = volumeValue / 100;
    audio.play();

    // When audio ends naturally, clear active state and resume default music
    audio.onended = () => {
      if (currentAudioRef.current === audio) {
        setActiveAudioFile(null);
        currentAudioRef.current = null;
        // Phát lại nhạc mặc định khi kết thúc âm thanh thư viện
        dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: true });
      }
    };

    currentAudioRef.current = audio;
    setActiveAudioFile(audioFile);
    setCurrentTrackIndex(null);
    setIsPlaylistPlaying(false);
    // Tạm dừng nhạc mặc định khi phát âm thanh thư viện
    dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: false });
  }

  const startPlaylistAudioAtIndex = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaylistPlaying(true);
    startPlaylistMode();
  };

  const togglePlaylistTrack = (index) => {
    if (currentTrackIndex === index && isPlaylistPlaying) {
      playPause();
    } else {
      startPlaylistAudioAtIndex(index);
    }
  };

  const playNextInPlaylist = () => {
    nextTrack();
    setIsPlaylistPlaying(true);
    startPlaylistMode();
  };

  const playPrevInPlaylist = () => {
    prevTrack();
    setIsPlaylistPlaying(true);
    startPlaylistMode();
  };

  const stopPlaylist = () => {
    setIsPlaylistPlaying(false);
    stopPlaylistMode();
  };

  // Sync volume slider with the currently playing library audio
  useEffect(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.volume = volumeValue / 100;
    }
  }, [volumeValue]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="video-selector-sidebar" ref={sidebarRef}>
      <div className="sidebar-controls">
        <div 
          className={`control-item ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => toggleSection('settings')}
        >
          <div className="control-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div 
          className={`control-item ${activeSection === 'video' ? 'active' : ''}`}
          onClick={() => toggleSection('video')}
        >
          <div className="control-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9L15 12L10 15V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div 
          className={`control-item ${activeSection === 'book' ? 'active' : ''}`}
          onClick={() => toggleSection('book')}
        >
          <div className="control-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div 
          className={`control-item ${activeSection === 'list' ? 'active' : ''}`}
          onClick={() => toggleSection('list')}
        >
          <div className="control-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div 
          className={`control-item ${activeSection === 'compass' ? 'active' : ''}`}
          onClick={() => toggleSection('compass')}
        >
          <div className="control-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {isVideoOpen && (
        <div className="sidebar-panel video-panel">
          <div className="panel-header">
            <h3>Chọn video</h3>
            <button className="reset-button" onClick={resetVideo}>×</button>
          </div>
          <div className="video-categories">
            {categories.map(category => (
              <div key={category.id} className="video-category">
                <h4>{category.icon} {category.name}</h4>
                <div className="video-list">
                  {videoOptions
                    .filter(video => category.id === 'all' || video.category.includes(category.id))
                    .map((video, index) => (
                      <div 
                        key={index} 
                        className={`video-option ${selectedVideo === video.path ? 'selected' : ''}`}
                        onClick={() => handleVideoSelect(video.path)}
                      >
                        {video.name}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      )}
      
      {isBookOpen && (
        <div className="sidebar-panel book-panel">
          <DocumentPanel onClose={() => closeAllSections()} />
        </div>
      )}
      
      {isListOpen && (
        <div className="sidebar-panel list-panel">
          <div className="panel-header">
            <h3>Danh sách phát</h3>
            <button className="close-button" onClick={() => closeAllSections()}>×</button>
          </div>
          <div className="panel-content">
            <div className="playlist-controls">
              <button className="prev-button" onClick={playPrevInPlaylist}>⏮</button>
              {isPlaylistPlaying ? (
                <button className="pause-button" onClick={() => {
                  if (currentAudioRef.current) currentAudioRef.current.pause();
                  setIsPlaylistPlaying(false);
                }}>⏸ Tạm dừng</button>
              ) : (
                <button className="play-button" onClick={() => {
                  if (currentAudioRef.current && currentAudioRef.current.paused && currentTrackIndex != null) {
                    currentAudioRef.current.volume = volumeValue / 100;
                    currentAudioRef.current.play();
                    setIsPlaylistPlaying(true);
                  } else if (currentTrackIndex != null) {
                    startPlaylistAudioAtIndex(currentTrackIndex);
                  } else {
                    startPlaylistAudioAtIndex(0);
                  }
                }}>▶️ Phát</button>
              )}
              <button className="next-button" onClick={playNextInPlaylist}>⏭</button>
              <button className="stop-button" onClick={stopPlaylist}>⏹ Dừng</button>
            </div>
            <div className="playlist-list">
              {currentPlaylist.map((track, index) => (
                <div 
                  key={track.id}
                  className={`playlist-item ${currentTrackIndex === index && isPlaylistPlaying ? 'playing' : ''}`}
                  onClick={() => togglePlaylistTrack(index)}
                  role="button"
                  tabIndex={0}
                  title="Nhấn để phát/tạm dừng bài này"
                >
                  <span className="track-title">{track.name}</span>
                  <span className="track-action">{` - ${currentTrackIndex === index && isPlaylistPlaying ? 'Đang phát (nhấn để tạm dừng)' : 'Nhấn để phát'}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>      
      )}
      
      {isSettingsOpen && (
        <div className="sidebar-panel settings-panel">
          <div className="panel-header">
            <h3>Cài đặt</h3>
            <button className="close-button" onClick={() => closeAllSections()}>×</button>
          </div>
          <div className="panel-content">
            <div className="settings-group">
              <h4>Âm lượng</h4>
              <div className="slider-control">
                <label>Âm nhạc</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volumeValue} 
                  onChange={(e) => dispatch(changeVolume(e.target.value))}
                />
              </div>
            </div>
            
            <div className="settings-group">
              <h4>Âm thanh từ thư viện</h4>
              <div className="music-library">
                <div className="music-item" onClick={() => playAudio('birds.mp3')}>
                  <span className="music-icon"></span>
                  <span className="music-name">Tiếng chim</span>
                </div>
                <div className="music-item" onClick={() => playAudio('rain_forest.mp3')}>
                  <span className="music-icon"></span>
                  <span className="music-name">Mưa rừng</span>
                </div>
                <div className="music-item" onClick={() => playAudio('city_traffic.mp3')}>
                  <span className="music-icon"></span>
                  <span className="music-name">Giao thông</span>
                </div>
                <div className="music-item" onClick={() => playAudio('people_talk_inside.mp3')}>
                  <span className="music-icon"></span>
                  <span className="music-name">Tiếng người nói chuyện</span>
                </div>
              </div>
            </div>
            
            <p className="note">Chức năng âm lượng đã được kết nối. Bạn có thể điều chỉnh âm lượng và chọn âm thanh từ thư viện có sẵn.</p>
          </div>
        </div>
      )}
      
      {isCompassOpen && (
        <div className="sidebar-panel compass-panel">
          <div className="panel-header">
            <h3>Nhạc Tuỳ Chọn link google</h3>
            <button className="close-button" onClick={() => closeAllSections()}>×</button>
          </div>
          <div className="panel-content">
            <div className="google-music-form">
              {!isPlayingGoogleMusic ? (
                <>
                  <p className="form-description">Dán link nhạc từ Google Drive hoặc Google Music để phát:</p>
                  <form className="music-input-form" onSubmit={(e) => {
                    e.preventDefault();
                    if (googleMusicLink) {
                      setIsPlayingGoogleMusic(true);
                      // Tạm dừng nhạc mặc định khi phát nhạc từ Google
                      dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: false });
                    }
                  }}>
                    <input 
                      type="text" 
                      placeholder="Nhập link nhạc từ Google..." 
                      className="google-music-input"
                      value={googleMusicLink}
                      onChange={(e) => setGoogleMusicLink(e.target.value)}
                    />
                    <button type="submit" className="submit-button">Phát nhạc</button>
                  </form>
                  <div className="music-instructions">
                    <h4>Hướng dẫn:</h4>
                    <ul>
                      <li>Dán link nhạc từ Google Drive hoặc Google Music</li>
                      <li>Nhấn "Phát nhạc" để bắt đầu</li>
                      <li>Nhạc sẽ tự động quay về mặc định sau khi kết thúc</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="google-music-player">
                  <h4>Đang phát nhạc từ Google</h4>
                  <ReactPlayer
                    url={googleMusicLink}
                    width="100%"
                    height="80px"
                    controls={true}
                    playing={true}
                    onEnded={() => {
                      setIsPlayingGoogleMusic(false);
                      // Tiếp tục phát nhạc mặc định khi nhạc từ Google kết thúc
                      dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: true });
                    }}
                  />
                  <button 
                    className="stop-button"
                    onClick={() => {
                      setIsPlayingGoogleMusic(false);
                      // Tiếp tục phát nhạc mặc định khi dừng nhạc từ Google
                      dispatch({ type: 'SET_MUSIC_PLAYING', isPlaying: true });
                    }}
                  >
                    Dừng và quay lại nhạc mặc định
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSelector;