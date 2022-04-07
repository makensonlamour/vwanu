import { api } from "../../lib/api";
import { useFetch, usePost } from "../../lib/react-query";
import { getToken, decoder, deleteToken } from "../../helpers";

export const login = (credentials) => api.post("/auth", credentials);

export const register = (credentials) => api.post("/user", credentials);

export const useVerifyEmail = (data) => usePost(`/user/verify/${data.id}/${data.activationKey}`);

export const useResetPassword = (credentials) => usePost(`/user/resetPassword/${credentials.idUser}/${credentials.resetPasswordKey}`);

export const useForgotPassword = () => usePost("/user/forgotPassword");

export const useGetProfile = () => {
  const token = getToken();
  const decodeToken = decoder(token);
  const context = useFetch(`/user/${decodeToken?.user?.id}`, undefined, { retry: false });
  return { ...context, data: context?.data?.data?.user };
};

export const useLogOut = () => {
  deleteToken();
};
