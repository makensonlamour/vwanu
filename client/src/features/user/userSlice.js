import { api } from "../../lib/api";
import { useUpdate, useFetch } from "../../lib/react-query";

export const useUpdateUser = (queryKey, oldData, newData) => useUpdate(queryKey, `/user`, (oldData, newData));

export const updateProfilePicture = (data) => api.put(`/user/${data?.id}`, data.formData);

export const useGetOtherProfile = (queryKey, enabled, id) => {
  const context = useFetch(queryKey, enabled, `/user/${id}`, "");
  return { ...context, data: context?.data?.data?.user };
};
