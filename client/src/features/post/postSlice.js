import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetPostsList = (queryKey, dataObj) => useLoadMore(queryKey, `/post?UserId=${dataObj?.UserId}`);

export const useGetPost = (queryKey, PostId) => useFetch(queryKey, `/post/${PostId}`);

export const useCreatePost = (queryKey, oldData, newData) => usePost(queryKey, `/post`, (oldData, newData));

//export const useDeletePost = (id) => useDelete(`/post?UserId=${dataObj?.UserId}`);

// export const useUpdatePost = (oldData, newData, dataObj) => useUpdate(`/post?UserId=${dataObj?.UserId}`, dataObj, oldData, newData);
