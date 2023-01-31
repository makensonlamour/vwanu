import { useContext } from "react";
import { CallContext } from "../context/CallContext";

const useCallContext = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("Please use this context inside its provider");
  }
  return context;
};
export default useCallContext;
