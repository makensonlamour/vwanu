import { usePost, useLoadMore } from "../../lib/react-query";

export const useSendFollow = (queryKey) => usePost(queryKey, `/followers`);

export const useSendUnfollow = (queryKey) => usePost(queryKey, `/followers`);

export const useGetListFollowers = (queryKey, enabled = true, UserId) =>
  useLoadMore(
    queryKey,
    enabled,
    UserId !== undefined ? `/followers/?action=people-who-follow-me&UserId=${UserId}` : `/followers/?action=people-who-follow-me`
  );
export const useGetListFollowing = (queryKey, enabled = true, UserId) =>
  useLoadMore(
    queryKey,
    enabled,
    UserId !== undefined ? `/followers/?action=people-i-follow&UserId=${UserId}` : `/followers/?action=people-i-follow`
  );
