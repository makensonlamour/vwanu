import { useState, useEffect } from "react";
// core components
import client from "../features/feathers";
import useAuthContext from "./useAuthContext";
import { register } from "../features/auth/authSlice";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setCancel] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { dispatch, Types } = useAuthContext();

  const signup = async ({ firstName, lastName, email, password, passwordConfirmation, termOfUse }) => {
    setError(null);
    setLoading(true);
    try {
      //signup the user
      console.log({ firstName, lastName, email, password, passwordConfirmation, termOfUse });
      const res = await register({ firstName, lastName, email, password, passwordConfirmation, termOfUse });
      console.log(res?.data);
      if (res?.data) {
        dispatch({ type: Types.USER_LOGGED_IN, payload: res?.data });
      }
      // try create user with data
      // dispatch the user to the whole application

      //dispatch({ type: Types.USER_LOGGED_IN, payload: user });
      if (!isCancelled) setLoading(false);
    } catch (error) {
      console.error(error);
      if (!isCancelled) {
        setError(error.message);
        setLoading(false);
      }
    }
  };
  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      // try to sign in with provided data
      const res = await client.authenticate({
        strategy: "local",
        email,
        password,
      });
      console.log(res.User);
      //   dispatch user to the whole app if successful
      dispatch({ type: Types.USER_LOGGED_IN, payload: res.User });

      if (!isCancelled) {
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // get the current user ,
      // stop refreshing token
      // logout the user and
      //   const { uid } = auth.currentUser;
      if (!isCancelled) {
        setLoading(false);
        setError(null);
      }
      // Let the whole app knows the user is out
      dispatch({ type: Types.USER_LOGGED_OUT });
      window.location.reload();
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    // clean up function
    return () => {
      setCancel(true);
    };
  }, []);

  return { logout, signup, login, isLoading, error };
};

export default useAuth;
