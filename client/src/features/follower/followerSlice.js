import { usePost, useFetch } from "../../lib/react-query";

export const useSendFollow = (queryKey) => usePost(queryKey, `/followers`);
export const useGetListFollowers = (queryKey, enabled, UserId) =>
  useFetch(queryKey, enabled, `/followers/?action=people-who-follow-me?UserId=${UserId}`);
export const useGetListFollowing = (queryKey, enabled, UserId) =>
  useFetch(queryKey, enabled, `/followers/?action=people-i-follow?UserId=${UserId}`);
