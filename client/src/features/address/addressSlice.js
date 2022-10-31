import { useFetch } from "../../lib/react-query";

export const useGetCountry = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/country`);

export const useGetState = (queryKey, enabled = false, countryId) => useFetch(queryKey, enabled, `/state?CountryId=${countryId}`);

export const useGetCity = (queryKey, enabled = false, stateId) => useFetch(queryKey, enabled, `/city?StateId=${stateId}`);

export const useGetAddressType = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/address-types`);
