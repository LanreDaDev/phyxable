const INITIAL_STATE = new Date();

const applySetCurrentDay = (state, action) => ({
  ...state,
  currentDay: action.data,
});

function currentDayReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CURRENT_DAY_SET": {
      return applySetCurrentDay(state, action);
    }

    default:
      return state;
  }
}
export default currentDayReducer;
