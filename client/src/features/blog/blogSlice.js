import { useFetch, usePost } from "../../lib/react-query";

export const useGetBlogList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/blogs`);

export const useGetMyBlogList = (queryKey, enabled = true, userId) => useFetch(queryKey, enabled, `/blogs?UserId=${userId}`);

export const useGetBlog = (queryKey, enabled = true, blogId) => useFetch(queryKey, enabled, `/blogs/${blogId}`);

export const useCreateBlog = (queryKey, oldData, newData) => usePost(queryKey, `/blogs`, (oldData, newData));
