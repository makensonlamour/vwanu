import { useFetch, usePost, useLoadMore, useDelete, useUpdate } from "../../lib/react-query";

export const useGetPostsList = (queryKey, enabled = false, UserId) => useLoadMore(queryKey, enabled, `/timeline?UserId=${UserId}`);

export const useGetTimelineList = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/timeline`);

export const useGetPost = (queryKey, enabled = false, PostId) => useFetch(queryKey, enabled, `/posts/${PostId}`);

export const useCreatePost = (queryKey, oldData, newData) => usePost(queryKey, `/posts`, (oldData, newData));

export const useGetCommunityPostList = (queryKey, enabled = false, CommunityId) =>
  useLoadMore(queryKey, enabled, `/posts?CommunityId=${CommunityId}`);

export const useUploadGiph = (queryKey, oldData, newData) => usePost(queryKey, `/medias`, (oldData, newData));

export const useDeletePost = (queryKey, oldData, newData) => useDelete(queryKey, `/posts`, (oldData, newData));

export const useUpdatePost = (queryKey, oldData, newData) => useUpdate(queryKey, `/posts`, (oldData, newData));
