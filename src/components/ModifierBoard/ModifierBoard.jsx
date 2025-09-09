import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ModifierBoard.scss';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { changeMoodStatus } from '../../redux/actions';

import ReactAudioPlayer from 'react-audio-player';
import { changeRainStatus } from '../../redux/actions';
import { changeVolume } from '../../redux/actions';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import TodoList from '../TodoList/TodoList';

const ModifierBoard = ({
  seconds,
  minutes,
  hours,
  isRunning,
  pause,
  resume,
  restart,
  setTimerHandler,
  setTimerStart,
  timerStart,
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.moodState);
  const rainData = useSelector((state) => state.rainState);
  const volumeData = useSelector((state) => state.volumeState);

  const { rainValue } = rainData;
  const { moodMode } = data;
  const { volumeValue } = volumeData;

  const [openMood, setOpenMood] = useState(true);
  const [openFocus, setOpenFocus] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState('');

  const [cityTraffic, setCityTraffic] = useState(0);
  const [cityRain, setCityRain] = useState(rainValue);
  const [fireplace, setFireplace] = useState(0);
  const [snow, setSnow] = useState(0);
  const [summerStorm, setSummerStorm] = useState(0);
  const [fan, setFan] = useState(0);
  const [forestNight, setForestNight] = useState(0);
  const [wave, setWave] = useState(0);
  const [wind, setWind] = useState(0);
  const [people, setPeople] = useState(0);
  const [river, setRiver] = useState(0);
  const [rainForest, setRainForest] = useState(0);

  const rainSliderHandler = (e) => {
    // if slide then make it rain
    if (e.target.value > 0) dispatch(changeRainStatus('clear', cityRain));
    // if value = 0 then stop rain
    else if (e.target.value === 0) dispatch(changeRainStatus('rain', 0));
    setCityRain(e.target.value);
  };

  const openFocusHandler = () => {
    setOpenFocus(!openFocus);
    setOpenMood(false);
    setOpenNavigation(false);
  };

  const openMoodHandler = () => {
    setOpenMood(!openMood);
    setOpenFocus(false);
    setOpenNavigation(false);
  };

  const openNavigationHandler = () => {
    setOpenNavigation(!openNavigation);
    setOpenMood(false);
    setOpenFocus(false);
  };
  
  const handleNavLinkClick = (linkName) => {
    setActiveNavLink(linkName);
  };

  const changeMoodHandler = (e) => {
    dispatch(changeMoodStatus(e.target.id));
  };

  const changeVolumeHandler = (e) => {
    dispatch(changeVolume(e.target.value));
  };

  return (
    <>
      <div>
        {openNavigation && (
          <div className='modifierBox navigation-box'>
            <h4>Navigation</h4>
            <div className='navigation-links-vertical'>
              <a 
                href='/' 
                className={`nav-link-vertical ${activeNavLink === 'home' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('home')}
                title="Home"
              >
                <i className='fas fa-home'></i>
              </a>
              <a 
                href='/about' 
                className={`nav-link-vertical ${activeNavLink === 'about' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('about')}
                title="About"
              >
                <i className='fas fa-info-circle'></i>
              </a>
              <a 
                href='https://github.com/phuclevinh2000/Lofi-website'
                target='_blank' 
                rel='noreferrer' 
                className={`nav-link-vertical ${activeNavLink === 'github' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('github')}
                title="GitHub"
              >
                <i className='fab fa-github'></i>
              </a>
              <a 
                href='/user' 
                className={`nav-link-vertical ${activeNavLink === 'profile' ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('profile')}
                title="Profile"
              >
                <i className='fas fa-user'></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModifierBoard;
