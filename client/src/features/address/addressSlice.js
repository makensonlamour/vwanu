import { useLoadMore, useFetch } from "../../lib/react-query";

export const useGetCountry = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/country`);

export const useGetState = (queryKey, enabled = false, countryId) => useLoadMore(queryKey, enabled, `/state?CountryId=${countryId}`);

export const useGetCity = (queryKey, enabled = false, stateId) => useLoadMore(queryKey, enabled, `/city?StateId=${stateId}`);

export const useGetAddressType = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/address-types`);
