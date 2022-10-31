import { useFetch } from "../../lib/react-query";

export const useLinkPreview = (queryKey, enabled = false, url) =>
  useFetch(queryKey, enabled, `https://get-link-preview.herokuapp.com/?url=${url}`);
