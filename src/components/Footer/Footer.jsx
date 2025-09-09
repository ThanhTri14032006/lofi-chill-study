import React from 'react';
import { useSelector } from 'react-redux';
import { useMusic } from '../../contexts/MusicContext';
import './Footer.scss';
import Player from '../Player/Player';

const Footer = () => {
  const { currentTrackIndex, currentPlaylist } = useMusic();

  return (
    <div className='footer'>
      <div className='author'>
        <span>Song name: {currentPlaylist[currentTrackIndex]?.name}</span>
      </div>
      <div className='controller'>
        <Player />
      </div>
    </div>
  );
};

export default Footer;
