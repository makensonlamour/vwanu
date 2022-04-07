import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetCommentList = (dataObj) => useLoadMore(`/comment?UserId=${dataObj?.UserId}`);

export const useGetComment = (dataObj) => useFetch(`/comment/${dataObj?.postId}`);

export const useCreateComment = (oldData, newData, dataObj) => usePost(`/comment?UserId=${dataObj?.UserId}`, dataObj, (oldData, newData));
