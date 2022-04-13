import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetCommentList = (dataObj) => useLoadMore(`/comment?UserId=${dataObj?.UserId}`);

export const useGetComment = (dataObj) => useFetch(`/comment/${dataObj?.postId}`);

export const useCreateComment = (queryKey, oldData, newData) => usePost(queryKey, `/comment`, (oldData, newData));
