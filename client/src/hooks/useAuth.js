import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

export const useAuth = () => {
  const data = useSelector(selectCurrentUser);

  return useMemo(() => ({ data }), [data]);
};
