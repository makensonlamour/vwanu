import { useUpdate, useLoadMore } from "../../lib/react-query";

export const useReadNotification = (queryKey, oldData, newData) => useUpdate(queryKey, `/notification`, (oldData, newData));

export const useGetNotificationList = (queryKey, enabled = false, userId) =>
  useLoadMore(queryKey, enabled, `/notification?to=${userId}&$sort[createdAt]=-1`);
