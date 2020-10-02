import { combineReducers } from "redux";

import weekOfReducer from "./weekOf";
import currentDayReducer from "./currentDay";
import modalStatusReducer from "./modalStatus";
import currentTimeReducer from "./currentTime";
import aptsReducer from "./apts";

export const rootReducer = combineReducers({
  weekOfReducer: weekOfReducer,
  currentDayReducer: currentDayReducer,
  modalStatusReducer: modalStatusReducer,
  currentTimeReducer: currentTimeReducer,
  aptsReducer: aptsReducer,
});
