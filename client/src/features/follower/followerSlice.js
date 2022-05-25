import { usePost, useFetch } from "../../lib/react-query";

export const useSendFollow = (queryKey) => usePost(queryKey, `/followers`);
export const useGetListFollowers = (queryKey, enabled) => useFetch(queryKey, enabled, `/followers/?action=people-who-follow-me`);
export const useGetListFollowing = (queryKey, enabled) => useFetch(queryKey, enabled, `/followers/?action=people-i-follow`);
