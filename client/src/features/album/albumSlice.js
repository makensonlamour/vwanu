import { useFetch, usePost } from "../../lib/react-query";

export const useGetAlbumList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/albums`);

export const useGetPhotoList = (queryKey, enabled = true, UserId) => useFetch(queryKey, enabled, `/medias?UserId=${UserId}`);

export const useGetPhoto = (queryKey, enabled = true, PhotoId) => useFetch(queryKey, enabled, `/medias/${PhotoId}`);

export const useGetAlbum = (queryKey, enabled = true, dataObj) => useFetch(queryKey, enabled, `/albums/${dataObj?.albumId}`);

export const useCreateAlbum = (queryKey, oldData, newData) => usePost(queryKey, `/albums`, (oldData, newData));
