const INITIAL_STATE = false;

const applySetModalStatus = (state, action) => ({
  ...state,
  modalStatus: action.data,
});

function modalStatusReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "MODAL_STATUS_SET": {
      return applySetModalStatus(state, action);
    }

    default:
      return state;
  }
}
export default modalStatusReducer;
