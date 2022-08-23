import { useFetch } from "../../lib/react-query";

export const useSearch = (queryKey, enabled = true, keyword) => useFetch(queryKey, enabled, `/search/?$search=${keyword}`);
