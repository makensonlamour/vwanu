import { useFetch, usePost } from "../../lib/react-query";

export const useGetListDiscussionCommunity = (queryKey, enabled = true, communityId) =>
  useFetch(queryKey, enabled, `/discussion?CommunityId=${communityId}`);

export const useCreateDiscussion = (queryKey, oldData, newData) => usePost(queryKey, `/discussion`, (oldData, newData));
