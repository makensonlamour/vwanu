import { useUpdate, useLoadMore } from "../../lib/react-query";

export const useReadNotification = (queryKey, oldData, newData) => useUpdate(queryKey, `/notification`, (oldData, newData));

export const useGetNotificationList = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/notification?$sort[createdAt]=-1`);
