import { useFetch, usePost } from "../../lib/react-query";

export const useGetInterestList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/interests`);

export const useGetMyInterestList = (queryKey, enabled = true, userId) => useFetch(queryKey, enabled, `/interests?UserId=${userId}`);

// export const useGetInterest = (queryKey, enabled = true, dataObj) => useFetch(queryKey, enabled, `/blogs/${dataObj?.albumId}`);

export const useCreateInterest = (queryKey, oldData, newData) => usePost(queryKey, `/interests`, (oldData, newData));
