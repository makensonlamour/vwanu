import { useUpdate } from "../../lib/react-query";

export const useReadNotification = (queryKey, oldData, newData) => useUpdate(queryKey, `/notification`, (oldData, newData));
