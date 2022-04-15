import { useUpdate, useFetch } from "../../lib/react-query";

export const useUpdateUser = (queryKey, oldData, newData) => useUpdate(queryKey, `/user`, (oldData, newData));

export const useUpdateProfilePicture = (queryKey, oldData, newData) => useUpdate(queryKey, `/user`, (oldData, newData));

export const useGetOtherProfile = (queryKey, enabled, id) => {
  const context = useFetch(queryKey, enabled, `/user/${id}`, "");
  return { ...context, data: context?.data?.data?.user };
};
