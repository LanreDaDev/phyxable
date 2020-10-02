const INITIAL_STATE = new Date();

const applySetApts = (state, action) => ({
  ...state,
  apts: action.data,
});

function aptsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "APTS_SET": {
      return applySetApts(state, action);
    }

    default:
      return state;
  }
}
export default aptsReducer;
