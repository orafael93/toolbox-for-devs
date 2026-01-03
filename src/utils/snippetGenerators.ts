import { RequestConfig } from "@/types";

export const generateFetchSnippet = (config: RequestConfig): string => {
  const { url, method, headers, body } = config;

  const hasBody = body && body.trim() && method !== "GET" && method !== "HEAD";

  const headersObj = headers.reduce((acc, h) => {
    if (h.key && h.value) {
      acc[h.key] = h.value;
    }
    return acc;
  }, {} as Record<string, string>);

  const options: Record<string, unknown> = {
    method,
    headers: headersObj,
  };

  if (hasBody) {
    options.body = body;
  }

  const optionsStr = JSON.stringify(options, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n");

  return `fetch("${url}", ${optionsStr})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
};

export const generateAxiosSnippet = (config: RequestConfig): string => {
  const { url, method, headers, body } = config;

  const hasBody = body && body.trim() && method !== "GET" && method !== "HEAD";

  const headersObj = headers.reduce((acc, h) => {
    if (h.key && h.value) {
      acc[h.key] = h.value;
    }
    return acc;
  }, {} as Record<string, string>);

  const axiosConfig: Record<string, unknown> = {
    method: method.toLowerCase(),
    url,
    headers: headersObj,
  };

  if (hasBody) {
    try {
      axiosConfig.data = JSON.parse(body);
    } catch {
      axiosConfig.data = body;
    }
  }

  const configStr = JSON.stringify(axiosConfig, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n");

  return `axios(${configStr})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`;
};

export const generateXhrSnippet = (config: RequestConfig): string => {
  const { url, method, headers, body } = config;

  const hasBody = body && body.trim() && method !== "GET" && method !== "HEAD";

  let snippet = `const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Response:', xhr.responseText);
    } else {
      console.error('Error:', xhr.status, xhr.statusText);
    }
  }
};

xhr.open("${method}", "${url}", true);
`;

  headers.forEach((h) => {
    if (h.key && h.value) {
      snippet += `xhr.setRequestHeader("${h.key}", "${h.value}");\n`;
    }
  });

  if (hasBody) {
    snippet += `\nxhr.send(${JSON.stringify(body)});`;
  } else {
    snippet += `\nxhr.send();`;
  }

  return snippet;
};
