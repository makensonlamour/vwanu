import { useFetch } from "../../lib/react-query";

export const useGetCountry = (queryKey, enabled = true, keyword) => useFetch(queryKey, enabled, `/search/?$search=${keyword}`);
