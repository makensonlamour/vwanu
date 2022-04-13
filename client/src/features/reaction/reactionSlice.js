import { usePost, useDelete, useUpdate } from "../../lib/react-query";

export const useCreateReaction = (queryKey, oldData, newData, dataObj) => usePost(queryKey, `/reaction`, dataObj, (oldData, newData));

export const useDeleteReaction = (queryKey, oldData, newData) => useDelete(queryKey, `/reaction`, (oldData, newData));

export const useUpdateReaction = (queryKey, oldData, newData, dataObj) => useUpdate(queryKey, `/reaction`, dataObj, oldData, newData);
