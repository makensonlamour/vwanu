import { useFetch, usePost, useUpdate } from "../../lib/react-query";

export const useGetListDiscussionCommunity = (queryKey, enabled = true, communityId) =>
  useFetch(queryKey, enabled, `/discussion?CommunityId=${communityId}`);

export const useCreateDiscussion = (queryKey, oldData, newData) => usePost(queryKey, `/discussion`, (oldData, newData));

export const useGetDiscussion = (queryKey, enabled = true, discussionId) => useFetch(queryKey, enabled, `/discussion/${discussionId}`);

export const useGetListDiscussionReplies = (queryKey, enabled = true, discussionId) =>
  useFetch(queryKey, enabled, `/discussion?DiscussionId=${discussionId}`);

export const useUpdateDiscussion = (queryKey, oldData, newData) => useUpdate(queryKey, `/discussion`, (oldData, newData));
