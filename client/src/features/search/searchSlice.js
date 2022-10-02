import { useFetch } from "../../lib/react-query";

export const useSearch = (queryKey, enabled = true, keyword) => useFetch(queryKey, enabled, `/search/?$search=${keyword}`);

export const useCommunitySearch = (queryKey, enabled = true, keyword) =>
  useFetch(queryKey, enabled, `/search-community/?$search=${keyword}`);

export const useBlogSearch = (queryKey, enabled = true, keyword) => useFetch(queryKey, enabled, `/search-blog/?$search=${keyword}`);
