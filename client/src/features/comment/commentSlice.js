import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetCommentList = (queryKey, enabled = true, dataObj) =>
  useLoadMore(queryKey, enabled, `/comment?UserId=${dataObj?.UserId}`);

export const useGetComment = (queryKey, enabled = true, dataObj) => useFetch(queryKey, enabled, `/comment/${dataObj?.postId}`);

export const useCreateComment = (queryKey, oldData, newData) => usePost(queryKey, `/comment`, (oldData, newData));
