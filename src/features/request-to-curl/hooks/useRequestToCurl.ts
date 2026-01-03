import { useRequestStore } from "@/store";
import { generateCurl } from "@/utils";

export const useRequestToCurl = () => {
  const {
    url,
    method,
    headers,
    body,
    setUrl,
    setMethod,
    addHeader,
    updateHeader,
    removeHeader,
    setBody,
    reset,
    getRequestConfig,
  } = useRequestStore();

  const curlCommand = !url.trim() ? "" : generateCurl(getRequestConfig());

  return {
    url,
    method,
    headers,
    body,
    curlCommand,
    setUrl,
    setMethod,
    addHeader,
    updateHeader,
    removeHeader,
    setBody,
    reset,
  };
};
