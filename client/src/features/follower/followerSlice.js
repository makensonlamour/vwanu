import { usePost, useLoadMore } from "../../lib/react-query";

export const useSendFollow = (queryKey) => usePost(queryKey, `/followers`);
export const useGetListFollowers = (queryKey, enabled) => useLoadMore(queryKey, enabled, `/followers/?action=people-who-follow-me`);
export const useGetListFollowing = (queryKey, enabled) => useLoadMore(queryKey, enabled, `/followers/?action=people-i-follow`);
