import { Trash2, Plus } from "lucide-react";

import { HttpMethod } from "@/types";
import { CodeDisplay } from "@/components";
import { useRequestToCurl } from "@/features/request-to-curl/hooks/useRequestToCurl";

const HTTP_METHODS: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
];

export const RequestToCurl = () => {
  const {
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
  } = useRequestToCurl();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-app-text">Request to cURL</h2>
          <p className="text-sm text-app-text-secondary mt-1">
            Build your HTTP request and generate cURL command
          </p>
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 bg-app-sidebar hover:bg-app-accent hover:text-white text-app-text rounded-md transition-colors text-sm"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-app-text mb-2">
            URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="w-full px-4 py-2 bg-app-input border border-app-accent/30 rounded-md text-app-text placeholder-app-text-secondary focus:outline-none focus:ring-2 focus:ring-app-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-app-text mb-2">
            Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className="w-full px-4 py-2 bg-app-input border border-app-accent/30 rounded-md text-app-text focus:outline-none focus:ring-2 focus:ring-app-accent"
          >
            {HTTP_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-app-text">
              Headers
            </label>
            <button
              onClick={addHeader}
              className="flex items-center gap-1 px-2 py-1 bg-app-accent hover:bg-app-accent/90 text-white rounded text-xs transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Header
            </button>
          </div>
          <div className="space-y-2">
            {headers.map((header, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) =>
                    updateHeader(index, e.target.value, header.value)
                  }
                  placeholder="Header name"
                  className="flex-1 px-3 py-2 bg-app-input border border-app-accent/30 rounded-md text-app-text placeholder-app-text-secondary focus:outline-none focus:ring-2 focus:ring-app-accent text-sm"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) =>
                    updateHeader(index, header.key, e.target.value)
                  }
                  placeholder="Header value"
                  className="flex-1 px-3 py-2 bg-app-input border border-app-accent/30 rounded-md text-app-text placeholder-app-text-secondary focus:outline-none focus:ring-2 focus:ring-app-accent text-sm"
                />
                <button
                  onClick={() => removeHeader(index)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {headers.length === 0 && (
              <p className="text-sm text-app-text-secondary italic">
                No headers added
              </p>
            )}
          </div>
        </div>

        {method !== "GET" && method !== "HEAD" && (
          <div>
            <label className="block text-sm font-medium text-app-text mb-2">
              Body / Payload
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              rows={6}
              className="w-full px-4 py-2 bg-app-input border border-app-accent/30 rounded-md text-app-text placeholder-app-text-secondary focus:outline-none focus:ring-2 focus:ring-app-accent font-mono text-sm"
            />
          </div>
        )}
      </div>

      {curlCommand && (
        <div>
          <h3 className="text-lg font-semibold text-app-text mb-3">
            Generated cURL
          </h3>
          <CodeDisplay code={curlCommand} language="curl" />
        </div>
      )}
    </div>
  );
};
