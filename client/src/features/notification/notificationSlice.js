import { useUpdate, useLoadMore, useFetch } from "../../lib/react-query";

export const useReadNotification = (queryKey, oldData, newData) => useUpdate(queryKey, `/notification`, (oldData, newData));

export const useGetNotificationList = (queryKey, enabled = false, userId) =>
  useLoadMore(queryKey, enabled, `/notification?to=${userId}&$sort[createdAt]=-1`);

export const useGetNotificationSettingList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/user_notification_types`);

export const useUpdateNotificationSettingList = (queryKey, oldData, newData) =>
  useUpdate(queryKey, `user_notification_types`, (oldData, newData));

export const useGetNotificationTypeList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/notification_types`);
