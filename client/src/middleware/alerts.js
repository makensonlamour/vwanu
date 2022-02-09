import { v4 as uuidv4 } from "uuid";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

import * as actions from "../store/api";
import { setAlert, removeAlert } from "../store/alerts";

const alert = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallFailed.type) return next(action);
  const id = uuidv4();
  next(action);
  console.log({ p: action });
  store.dispatch(
    setAlert({
      msg: action.payload,
      id,
      type: "error",
      icon: BsFillExclamationTriangleFill
    })
  );
  // Setting a sec for each 10 words
  setTimeout(() => store.dispatch(removeAlert(id)), action.payload.length * 200);
};

export default alert;
