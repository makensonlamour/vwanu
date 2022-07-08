import { useFetch, usePost, useUpdate } from "../../lib/react-query";
import { api } from "../../lib/api";

export const useGetCommunityList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/communities`);

export const useGetMyCommunityList = (queryKey, enabled = true, userId) => useFetch(queryKey, enabled, `/communities?UserId=${userId}`);

export const useGetCommunity = (queryKey, enabled = true, communityId) => useFetch(queryKey, enabled, `/communities/${communityId}`);

export const useCreateCommunity = (queryKey, oldData, newData) => usePost(queryKey, `/communities`, (oldData, newData));

export const useUpdateCommunity = (queryKey, communityId, oldData, newData) =>
  useUpdate(queryKey, `/communities/${communityId}`, (oldData, newData));

export const updateGroupPicture = (data) => api.patch(`/communities/${data?.id}`, data.formData);
