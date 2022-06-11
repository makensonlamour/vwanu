import { useFetch, usePost } from "../../lib/react-query";

export const useGetCommunityList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/community`);

export const useGetMyCommunityList = (queryKey, enabled = true, userId) => useFetch(queryKey, enabled, `/community?UserId=${userId}`);

export const useGetCommunity = (queryKey, enabled = true, communityId) => useFetch(queryKey, enabled, `/community/${communityId}`);

export const useCreateCommunity = (queryKey, oldData, newData) => usePost(queryKey, `/community`, (oldData, newData));
