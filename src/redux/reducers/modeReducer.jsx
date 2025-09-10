import { SET_MODE } from '../constantsType/actionType';

const INITIAL_STATE = {
  mode: 'day',
  manuallyChanged: false,
};

const modeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
        manuallyChanged: action.manuallyChanged !== undefined ? action.manuallyChanged : true,
      };
    default:
      return state;
  }
};

export default modeReducer;
