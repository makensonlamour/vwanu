import { useUpdate } from "../../lib/react-query";

export const useUpdateUser = (oldData, newData, idUser) => useUpdate(`/user/${idUser}`, (oldData, newData));

export const useUpdateProfilePicture = (oldData, newData, idUser) => useUpdate(`/user/${idUser}`, (oldData, newData));
