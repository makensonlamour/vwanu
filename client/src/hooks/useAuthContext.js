import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Please use this context inside its provider");
  }
  return context;
};
export default useAuthContext;
