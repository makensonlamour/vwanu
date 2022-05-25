import { api } from "../../lib/api";
import { useFetch, usePost } from "../../lib/react-query";
import { deleteToken, getToken } from "../../helpers";

export const login = (credentials) => api.post("/auth", credentials);

export const register = (credentials) => api.post("/users", credentials);

export const useVerifyEmail = (data) => usePost(`/users/verify/${data.id}/${data.activationKey}`);

export const useResetPassword = (credentials) => usePost(`/user/resetPassword/${credentials.idUser}/${credentials.resetPasswordKey}`);

export const useForgotPassword = () => usePost("/users/forgotPassword");

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
