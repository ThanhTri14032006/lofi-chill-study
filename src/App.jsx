import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import About from './components/About/About';
import { getUserAuth, applyScheduledTheme } from './redux/actions';
import { MusicProvider } from './contexts/MusicContext';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
    
    // Khởi tạo thời gian thay đổi giao diện khi ứng dụng khởi động
    dispatch(applyScheduledTheme());
    
    // Thiết lập interval để kiểm tra và áp dụng thay đổi giao diện mỗi phút
    const themeInterval = setInterval(() => {
      dispatch(applyScheduledTheme());
    }, 60000); // 60 giây
    
    return () => clearInterval(themeInterval);
  }, [dispatch]);

  return (
    <MusicProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
          <Route path='/login' element={<Login />} exact />
          <Route path='/about' element={<About />} exact />
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
