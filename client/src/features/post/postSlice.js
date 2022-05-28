import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetPostsList = (queryKey, UserId) => useLoadMore(queryKey, `/timeline?UserId=${UserId}`);

export const useGetTimelineList = (queryKey) => useLoadMore(queryKey, `/timeline`);

export const useGetPost = (queryKey, enabled = true, PostId) => useFetch(queryKey, enabled, `/timeline/${PostId}`);

export const useCreatePost = (queryKey, oldData, newData) => usePost(queryKey, `/posts`, (oldData, newData));

//export const useDeletePost = (id) => useDelete(`/post?UserId=${dataObj?.UserId}`);

// export const useUpdatePost = (oldData, newData, dataObj) => useUpdate(`/post?UserId=${dataObj?.UserId}`, dataObj, oldData, newData);
