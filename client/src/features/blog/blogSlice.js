import { useFetch, usePost, useUpdate, useDelete } from "../../lib/react-query";

export const useGetBlogList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/blogs`);

export const useGetMyBlogList = (queryKey, enabled = true, userId) => useFetch(queryKey, enabled, `/blogs?UserId=${userId}`);

export const useGetBlog = (queryKey, enabled = true, blogId) => useFetch(queryKey, enabled, `/blogs/${blogId}`);

export const useCreateBlog = (queryKey, oldData, newData) => usePost(queryKey, `/blogs`, (oldData, newData));

export const useUpdateBlog = (queryKey, blogId, oldData, newData) => useUpdate(queryKey, `/blogs/${blogId}`, (oldData, newData));

export const useDeleteBlog = (queryKey, oldData, newData) => useDelete(queryKey, `/blogs`, (oldData, newData));

export const useCreateResponse = (queryKey, oldData, newData) => usePost(queryKey, `/blogResponse`, (oldData, newData));

export const useGetAllResponse = (queryKey, enabled = true, blogId) => useFetch(queryKey, enabled, `/blogResponse?BlogId=${blogId}`);
