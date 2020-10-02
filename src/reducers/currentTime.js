const INITIAL_STATE = "";

const applySetCurrentTime = (state, action) => ({
  ...state,
  currentTime: action.data,
});

function currentTimeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CURRENT_TIME_SET": {
      return applySetCurrentTime(state, action);
    }

    default:
      return state;
  }
}
export default currentTimeReducer;
