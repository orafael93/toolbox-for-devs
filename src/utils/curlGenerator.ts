import { RequestConfig } from "@/types";

export const generateCurl = (config: RequestConfig): string => {
  const { url, method, headers, body } = config;

  let curl = "curl";

  if (method !== "GET") {
    curl += ` -X ${method}`;
  }

  curl += ` "${url}"`;

  headers.forEach((header) => {
    if (header.key && header.value) {
      curl += ` -H "${header.key}: ${header.value}"`;
    }
  });

  if (body && body.trim()) {
    const escapedBody = body.replace(/"/g, '\\"');
    curl += ` -d "${escapedBody}"`;
  }

  return curl;
};
