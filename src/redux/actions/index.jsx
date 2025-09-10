import { auth, googleProvider, githubProvider } from '../../firebase';
import {
  SET_USER,
  SET_MODE,
  SET_RAIN,
  SET_MOOD,
  SET_VOLUME,
  SET_MUSIC_PLAYING,
  SET_AUTO_THEME,
  SET_THEME_SCHEDULE,
  LIST_ADD,
  LIST_REMOVE,
  LIST_ADD_DONE,
  LIST_REMOVE_DONE,
} from '../constantsType/actionType';

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setMode = (payload, manuallyChanged = false) => ({
  type: SET_MODE,
  mode: payload,
  manuallyChanged: manuallyChanged,
});

export const setRain = (payload, value) => ({
  type: SET_RAIN,
  rainMode: payload,
  rainValue: value,
});

export const setMood = (payload) => ({
  type: SET_MOOD,
  moodMode: payload,
});

export const setVolume = (payload) => ({
  type: SET_VOLUME,
  volumeValue: payload,
});

export function signInAPI(providerType = 'google') {
  return (dispatch) => {
    const authProvider = providerType === 'github' ? githubProvider : googleProvider;
    auth
      .signInWithPopup(authProvider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then((payload) => {
        dispatch(setUser(null));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function changeDayNight(currentStatus) {
  let status;
  if (currentStatus === 'day') status = 'night';
  else if (currentStatus === 'night') status = 'day';
  return (dispatch) => {
    dispatch({
      type: SET_MODE,
      mode: status,
      manuallyChanged: true
    });
  };
}

export function setAutoTheme(isEnabled) {
  return {
    type: SET_AUTO_THEME,
    autoTheme: isEnabled,
  };
}

export function setThemeSchedule(dayStartTime, nightStartTime) {
  return {
    type: SET_THEME_SCHEDULE,
    dayStartTime,
    nightStartTime,
  };
}

export function toggleAutoTheme(isEnabled) {
  return (dispatch) => {
    dispatch(setAutoTheme(isEnabled));
  };
}

export function updateThemeSchedule(dayStartTime, nightStartTime) {
  return (dispatch) => {
    dispatch(setThemeSchedule(dayStartTime, nightStartTime));
  };
}

export function applyScheduledTheme() {
  return (dispatch, getState) => {
    const { themeScheduleState, modeState } = getState();
    const { autoTheme, dayStartTime, nightStartTime } = themeScheduleState;
    
    if (!autoTheme) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const dayHour = parseInt(dayStartTime.split(':')[0]);
    const dayMinute = parseInt(dayStartTime.split(':')[1]);
    const nightHour = parseInt(nightStartTime.split(':')[0]);
    const nightMinute = parseInt(nightStartTime.split(':')[1]);
    
    const isDayTime = (
      currentHour > dayHour || 
      (currentHour === dayHour && currentMinute >= dayMinute)
    ) && (
      currentHour < nightHour || 
      (currentHour === nightHour && currentMinute < nightMinute)
    );
    
    const targetMode = isDayTime ? 'day' : 'night';
    
    // Chỉ thay đổi giao diện theo lịch trình nếu chưa có tương tác thủ công gần đây
    // Lưu ý: Không ghi đè thay đổi thủ công của người dùng
    if (modeState.mode !== targetMode && !modeState.manuallyChanged) {
      dispatch(setMode(targetMode, false));
    }
  };
}

export function changeRainStatus(currentStatus, value) {
  let rainStatus;
  if (currentStatus === 'rain') rainStatus = 'clear';
  else if (currentStatus === 'clear') rainStatus = 'rain';
  return (dispatch) => {
    dispatch(setRain(rainStatus, value));
  };
}

export function changeMoodStatus(currentStatus) {
  return (dispatch) => {
    dispatch(setMood(currentStatus));
  };
}

export function changeVolume(currentStatus) {
  return (dispatch) => {
    dispatch(setVolume(currentStatus));
  };
}

export const setMusicPlaying = (isPlaying) => ({
  type: SET_MUSIC_PLAYING,
  isPlaying,
});

export function changeMusicPlayingStatus(isPlaying) {
  return (dispatch) => {
    dispatch(setMusicPlaying(isPlaying));
  };
}

export const addList = (name) => async (dispatch, getState) => {
  dispatch({
    type: LIST_ADD,
    payload: {
      name: name,
      complete: false,
    },
  });
  // save to local storage as listItems
  localStorage.setItem(
    'listItems',
    JSON.stringify(getState().todoItems.todoList)
  );
};

export const removeList = (name) => async (dispatch, getState) => {
  dispatch({
    type: LIST_REMOVE,
    payload: name,
  });
  localStorage.setItem(
    'listItems',
    JSON.stringify(getState().todoItems.todoList)
  );
};

export const addDone = (name) => async (dispatch, getState) => {
  dispatch({
    type: LIST_ADD_DONE,
    payload: {
      name: name,
      complete: true,
    },
  });
  localStorage.setItem(
    'listItems',
    JSON.stringify(getState().todoItems.todoList)
  );
};

export const removeDone = (name) => async (dispatch, getState) => {
  dispatch({
    type: LIST_REMOVE_DONE,
    payload: {
      name: name,
      complete: false,
    },
  });
  localStorage.setItem(
    'listItems',
    JSON.stringify(getState().todoItems.todoList)
  );
};
