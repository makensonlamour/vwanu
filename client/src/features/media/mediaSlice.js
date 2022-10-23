import { api } from "../../lib/api";
import { useDelete } from "../../lib/react-query";

export const uploadImage = (data) => api.post(`/medias`, data);

export const useDeleteImage = (queryKey) => useDelete(queryKey, `/medias`, (undefined, undefined));
