import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAutoTheme, updateThemeSchedule, applyScheduledTheme } from '../../redux/actions';
import './TimeBasedThemeSelector.scss';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const TimeBasedThemeSelector = () => {
  const dispatch = useDispatch();
  const themeSchedule = useSelector((state) => state.themeScheduleState);
  const { autoTheme, dayStartTime, nightStartTime } = themeSchedule;

  // Áp dụng theme theo lịch trình mỗi phút nhưng vẫn cho phép thay đổi thủ công
  useEffect(() => {
    if (autoTheme) {
      dispatch(applyScheduledTheme());
      const interval = setInterval(() => {
        dispatch(applyScheduledTheme());
      }, 60000); // Kiểm tra mỗi phút
      
      return () => clearInterval(interval);
    }
  }, [autoTheme, dispatch]);

  const handleAutoThemeToggle = (e) => {
    dispatch(toggleAutoTheme(e.target.checked));
    if (e.target.checked) {
      dispatch(applyScheduledTheme());
    }
    // Không cần reset theme khi tắt chế độ tự động, cho phép người dùng giữ theme hiện tại
  };

  const handleDayTimeChange = (e) => {
    dispatch(updateThemeSchedule(e.target.value, nightStartTime));
  };

  const handleNightTimeChange = (e) => {
    dispatch(updateThemeSchedule(dayStartTime, e.target.value));
  };

  return (
    <div className="theme-schedule-container">
      <h4>Tự động thay đổi giao diện</h4>
      
      <div className="auto-theme-toggle">
        <FormControlLabel
          control={
            <Switch
              checked={autoTheme}
              onChange={handleAutoThemeToggle}
              color="primary"
            />
          }
          label="Tự động thay đổi theo thời gian"
        />
        <p className="theme-note">Bạn vẫn có thể bấm vào biểu tượng ngày/đêm để thay đổi giao diện thủ công bất kỳ lúc nào.</p>
      </div>
      
      {autoTheme && (
        <div className="time-settings">
          <div className="time-input-group">
            <label>Chế độ ban ngày bắt đầu:</label>
            <input
              type="time"
              value={dayStartTime}
              onChange={handleDayTimeChange}
              className="time-input"
            />
          </div>
          
          <div className="time-input-group">
            <label>Chế độ ban đêm bắt đầu:</label>
            <input
              type="time"
              value={nightStartTime}
              onChange={handleNightTimeChange}
              className="time-input"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeBasedThemeSelector;