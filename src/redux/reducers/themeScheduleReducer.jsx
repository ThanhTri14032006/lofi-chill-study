import { SET_AUTO_THEME, SET_THEME_SCHEDULE } from '../constantsType/actionType';

const INITIAL_STATE = {
  autoTheme: true, // Bật chế độ tự động theo mặc định
  dayStartTime: '06:00', // Thời gian bắt đầu chế độ ban ngày (mặc định 7:00 sáng)
  nightStartTime: '18:00', // Thời gian bắt đầu chế độ ban đêm (mặc định 7:00 tối)
};

const themeScheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTO_THEME:
      return {
        ...state,
        autoTheme: action.autoTheme,
      };
    case SET_THEME_SCHEDULE:
      return {
        ...state,
        dayStartTime: action.dayStartTime || state.dayStartTime,
        nightStartTime: action.nightStartTime || state.nightStartTime,
      };
    default:
      return state;
  }
};

export default themeScheduleReducer;