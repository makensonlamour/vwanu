import { useFetch, useLoadMore, usePost, useUpdate } from "../../lib/react-query";

export const useGetListDiscussionCommunity = (queryKey, enabled = false, communityId) =>
  useLoadMore(queryKey, enabled, `/discussion?CommunityId=${communityId}`);

export const useGetListDiscussionByCategories = (queryKey, enabled = false, categoryId) =>
  useLoadMore(queryKey, enabled, `/discussion?categoryId=${categoryId}`);

export const useCreateDiscussion = (queryKey, oldData, newData) => usePost(queryKey, `/discussion`, (oldData, newData));

export const useGetListDiscussionCategory = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/forum-categories`);

export const useGetCategory = (queryKey, enabled = false, id) => useFetch(queryKey, enabled, `/forum-categories/${id}`);

export const useGetDiscussion = (queryKey, enabled = true, discussionId) => useFetch(queryKey, enabled, `/discussion/${discussionId}`);

export const useGetListDiscussionReplies = (queryKey, enabled = false, discussionId) =>
  useLoadMore(queryKey, enabled, `/discussion?DiscussionId=${discussionId}`);

export const useUpdateDiscussion = (queryKey, oldData, newData) => useUpdate(queryKey, `/discussion`, (oldData, newData));
