import { useFetch, usePost, useLoadMore } from "../../lib/react-query";

export const useGetAlbumList = (queryKey, enabled = true, dataObj) => useLoadMore(queryKey, enabled, `/albums?UserId=${dataObj?.UserId}`);

export const useGetAlbum = (queryKey, enabled = true, dataObj) => useFetch(queryKey, enabled, `/album/${dataObj?.albumId}`);

export const useCreateAlbum = (queryKey, oldData, newData) => usePost(queryKey, `/albums`, (oldData, newData));
