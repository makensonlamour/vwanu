import { api } from "../../lib/api";
import { useFetch, usePost } from "../../lib/react-query";
import { deleteToken, getToken } from "../../helpers";

export const login = (credentials) => api.post("/auth", credentials);

export const register = (credentials) => api.post("/users", credentials);

export const useVerifyEmail = (queryKey, oldData, newData) => usePost(queryKey, `/authmanagement`, (oldData, newData));

export const useResetPassword = (queryKey, oldData, newData) => usePost(queryKey, `/authmanagement`, (oldData, newData));

export const useForgotPassword = (queryKey, oldData, newData) => usePost(queryKey, "/authmanagement", (oldData, newData));

export const useGetProfile = (queryKey, enabled) => {
  const token = getToken();
  if (token) {
    enabled = true;
  } else {
    enabled = false;
  }
  const context = useFetch(queryKey, enabled, `/users/`, "", { retry: false });
  return { ...context, data: context?.data?.data?.user };
};

export const useLogOut = () => {
  deleteToken();
};
