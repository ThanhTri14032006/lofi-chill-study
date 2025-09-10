import { combineReducers } from 'redux';

import userReducer from './userReducer';
import modeReducer from './modeReducer';
import rainReducer from './rainReducer';
import moodReducer from './moodReducer';
import volumeReducer from './volumeReducer';
import musicPlayingReducer from './musicPlayingReducer';
import themeScheduleReducer from './themeScheduleReducer';
import { listReducer } from './listReducer';

export const rootReducer = combineReducers({
  userState: userReducer,
  modeState: modeReducer,
  rainState: rainReducer,
  moodState: moodReducer,
  volumeState: volumeReducer,
  musicPlayingState: musicPlayingReducer,
  themeScheduleState: themeScheduleReducer,
  todoItems: listReducer,
});

const todoItemsFromStorage = localStorage.getItem('listItems')
  ? JSON.parse(localStorage.getItem('listItems'))
  : [];

export const initialState = {
  todoItems: { todoList: todoItemsFromStorage },
};
