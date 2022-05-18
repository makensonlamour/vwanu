import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("Please use this context inside its provider");
  }
  return context;
};
export default useSocketContext;
