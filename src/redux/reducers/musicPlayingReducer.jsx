import { SET_MUSIC_PLAYING } from '../constantsType/actionType';

const INITIAL_STATE = {
  isDefaultMusicPlaying: true,
};

const musicPlayingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MUSIC_PLAYING:
      return {
        ...state,
        isDefaultMusicPlaying: action.isPlaying,
      };
    default:
      return state;
  }
};

export default musicPlayingReducer;