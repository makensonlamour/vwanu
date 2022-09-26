import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetCommentList = (queryKey, enabled = true, postId) => useLoadMore(queryKey, enabled, `/posts?PostId=${postId}`);

export const useGetComment = (queryKey, enabled = true, postId) => useFetch(queryKey, enabled, `/post/${postId}`);

export const useCreateComment = (queryKey, oldData, newData) => usePost(queryKey, `/posts`, (oldData, newData));
