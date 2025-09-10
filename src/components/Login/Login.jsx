import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { signInAPI } from '../../redux/actions';
import './Login.scss';

const Login = () => {
  const data = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const { user } = data;

  const signInHandler = (provider) => {
    dispatch(signInAPI(provider));
  };

  return (
    <div className='container'>
      {user !== null && <Navigate to='/' />}
      <nav className='container__nav'>
        <Link to='/home'>
          <img src='/assets/icons/lofi-logo.gif' alt='' />
        </Link>
        <div className='nav-menu'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.linkedin.com/in/phạm-thành-trí-73ba93362/'
          >
            <i className='fab fa-linkedin'></i>
            <span>Linkedin</span>
          </a>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/ThanhTri14032006/lofi-chill-study'
          >
            <i className='fab fa-github'></i>
            <span>GitHub</span>
          </a>
          <Link to='/about'>
            <i className='fas fa-info'></i>
            <span>About us</span>
          </Link>
        </div>
      </nav>
      <section className='container__section'>
        <h1>Welcome to the auto genrate lofi music made by Thanh Tri -Đev </h1>
        <h1>Login to explore the feature</h1>
        <div className='form'>
          <div className='icon' onClick={() => signInHandler('google')}>
            <img src='/assets/icons/google.svg' alt='' />
            Sign in with Google
          </div>
          <div className='icon github-icon' onClick={() => signInHandler('github')}>
            <i className='fab fa-github'></i>
            Sign in with GitHub
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
