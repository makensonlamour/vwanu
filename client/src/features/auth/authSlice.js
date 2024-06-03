import { api } from "../../lib/api";
import { useFetch, usePost, useUpdate } from "../../lib/react-query";
import { deleteToken, getToken } from "../../helpers";

export const login = (credentials) => api.post("/auth", credentials);

export const register = (credentials) => api.post("/users", credentials);

export const AddPhone = (queryKey, oldData, newData) => usePost(queryKey, "/phone", (oldData, newData));

export const useUpdatePhone = (queryKey, oldData, newData) => useUpdate(queryKey, "/phone?action=updatePrimary", (oldData, newData));

export const useGetPhone = (queryKey, enabled) => useFetch(queryKey, enabled, "/phone?primary_number=true");

export const useVerifyEmail = (queryKey, oldData, newData) => usePost(queryKey, `/authmanagement`, (oldData, newData));

export const useVerifyPhone = (queryKey, oldData, newData) => usePost(queryKey, `/phone?verify=true`, (oldData, newData));

export const useSendOtpPhone = (queryKey, oldData, newData) => useUpdate(queryKey, `/phone?action=resendVerification`, (oldData, newData));

export const useSendEmailVerification = (queryKey, oldData, newData) => usePost(queryKey, `/authmanagement`, (oldData, newData));

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
