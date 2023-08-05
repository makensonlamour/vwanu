import { api } from "../../lib/api";
import { useUpdate, useFetch, useLoadMore, usePost, useDelete } from "../../lib/react-query";

export const useUpdateUser = (queryKey, oldData, newData) => useUpdate(queryKey, `/users`, (oldData, newData));

export const updateProfilePicture = (data) => api.patch(`/users/${data?.id}`, data.formData);

export const useGetOtherProfile = (queryKey, enabled, id) => useFetch(queryKey, enabled, `/users/${id}`);

export const useGetAllMembers = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/users`);

export const useGetSuggestMembers = (queryKey, enabled = false, interest) => useLoadMore(queryKey, enabled, `/users?interests=${interest}`);

export const useGetOnline = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/users?online=true&friends=true`);

export const useCreateWorkplace = (queryKey, oldData, newData) => usePost(queryKey, `/workplace`, (oldData, newData));

export const useEditWorkplace = (queryKey, oldData, newData) => useUpdate(queryKey, `/workplace`, (oldData, newData));

export const useDeleteWorkplace = (queryKey, oldData, newData) => useDelete(queryKey, `/workplace`, (oldData, newData));
