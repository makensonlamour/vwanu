import { combineReducers } from "redux";

import alerts from "./alerts";
import authentication from "./auth";

export default combineReducers({
  authentication,
  alerts,
});
