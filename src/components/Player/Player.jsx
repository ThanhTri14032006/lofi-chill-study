import React from 'react';
import { useMusic } from '../../contexts/MusicContext';
import './Player.scss';

const Player = () => {
  const { 
    currentTrackIndex, 
    isPlaying, 
    currentPlaylist, 
    playPause, 
    nextTrack, 
    prevTrack 
  } = useMusic();

  return (
    <div className='music-player'>
      <div className='music-player--controls'>
        <button className='skip-btn' onClick={prevTrack}>
          <img src='/assets/icons/prev.svg' alt='' />
        </button>
        <button className='play-btn' onClick={playPause}>
          {isPlaying ? (
            <img src='/assets/icons/pause.svg' alt='' />
          ) : (
            <img src='/assets/icons/play.svg' alt='' />
          )}
        </button>
        <button className='skip-btn' onClick={nextTrack}>
          <img src='/assets/icons/next.svg' alt='' />
        </button>
      </div>
    </div>
  );
};

export default Player;
