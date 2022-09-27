import { api } from "../../lib/api";
import { useUpdate, useFetch, useLoadMore } from "../../lib/react-query";

export const useUpdateUser = (queryKey, oldData, newData) => useUpdate(queryKey, `/users`, (oldData, newData));

export const updateProfilePicture = (data) => api.patch(`/users/${data?.id}`, data.formData);

export const useGetOtherProfile = (queryKey, enabled, id) => useFetch(queryKey, enabled, `/users/${id}`);

export const useGetAllMembers = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/users`);
