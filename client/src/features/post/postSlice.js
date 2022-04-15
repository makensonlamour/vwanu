import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetPostsList = (queryKey, dataObj) => useLoadMore(queryKey, `/post?UserId=${dataObj?.UserId}`);

export const useGetTimelineList = (queryKey) => useLoadMore(queryKey, `/user/timeline`);

export const useGetPost = (queryKey, enabled = true, PostId) => useFetch(queryKey, enabled, `/post/${PostId}`);

export const useCreatePost = (queryKey, oldData, newData) => usePost(queryKey, `/post`, (oldData, newData));

//export const useDeletePost = (id) => useDelete(`/post?UserId=${dataObj?.UserId}`);

// export const useUpdatePost = (oldData, newData, dataObj) => useUpdate(`/post?UserId=${dataObj?.UserId}`, dataObj, oldData, newData);
