import { useFetch, usePost, useUpdate, useLoadMore } from "../../lib/react-query";

export const useGetAlbumList = (queryKey, enabled = false, userId) => useLoadMore(queryKey, enabled, `/albums?UserId=${userId}`);

export const useGetPhotoList = (queryKey, enabled = false, UserId) => useLoadMore(queryKey, enabled, `/medias?UserId=${UserId}`);

export const useGetPhoto = (queryKey, enabled = true, PhotoId) => useFetch(queryKey, enabled, `/medias/${PhotoId}`);

export const useGetAlbum = (queryKey, enabled = true, dataObj) => useFetch(queryKey, enabled, `/albums/${dataObj?.albumId}`);

export const useCreateAlbum = (queryKey, oldData, newData) => usePost(queryKey, `/albums`, (oldData, newData));

export const useDeleteAlbum = (queryKey, oldData, newData) => usePost(queryKey, `/albums`, (oldData, newData));

export const useAddPhoto = (queryKey, oldData, newData, albumId) => useUpdate(queryKey, `/albums/${albumId}`, (oldData, newData));

export const useUpdateAlbum = (queryKey, oldData, newData, albumId) => useUpdate(queryKey, `/albums/${albumId}`, (oldData, newData));
