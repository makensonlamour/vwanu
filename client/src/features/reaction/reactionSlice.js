import { usePost, useDelete, useUpdate } from "../../lib/react-query";

//export const useGetPost = (PostId) => useFetch(`/post/${PostId}`);

export const useCreateReaction = (oldData, newData, dataObj) => usePost(`/reaction`, dataObj, (oldData, newData));

export const useDeleteReaction = (reactionId) => useDelete(`/reaction/${reactionId}`);

export const useUpdateReaction = (oldData, newData, dataObj) => useUpdate(`/reaction/${dataObj?.reactionId}`, dataObj, oldData, newData);
