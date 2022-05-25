import { api } from "../../lib/api";
import { useUpdate, useFetch } from "../../lib/react-query";

export const useUpdateUser = (queryKey, oldData, newData) => useUpdate(queryKey, `/users`, (oldData, newData));

export const updateProfilePicture = (data) => api.patch(`/users/${data?.id}`, data.formData);

export const useGetOtherProfile = (queryKey, enabled, id) => {
  const context = useFetch(queryKey, enabled, `/users/${id}`, "");
  return { ...context, data: context?.data?.data };
};
