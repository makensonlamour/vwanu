import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetPostsList = (dataObj) => useLoadMore(`/post?UserId=${dataObj?.UserId}`);

export const useGetPost = (PostId) => useFetch(`/post/${PostId}`);

export const useCreatePost = (oldData, newData, dataObj) => usePost(`/post?UserId=${dataObj?.UserId}`, dataObj, (oldData, newData));

//export const useDeletePost = (id) => useDelete(`/post?UserId=${dataObj?.UserId}`);

// export const useUpdatePost = (oldData, newData, dataObj) => useUpdate(`/post?UserId=${dataObj?.UserId}`, dataObj, oldData, newData);
