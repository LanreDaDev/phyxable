const INITIAL_STATE = [];

const applySetWeekOf = (state, action) => ({
  ...state,
  weekOf: action.data,
});

function weekOfReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "WEEK_OF_SET": {
      return applySetWeekOf(state, action);
    }

    default:
      return state;
  }
}
export default weekOfReducer;
