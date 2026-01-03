import { describe, it, expect } from "vitest";
import {
  generateFetchSnippet,
  generateAxiosSnippet,
  generateXhrSnippet,
} from "@/utils/snippetGenerators";
import { RequestConfig } from "@/types";

describe("snippetGenerators", () => {
  describe("generateFetchSnippet", () => {
    it("should generate fetch snippet for GET request", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [],
        body: "",
      };

      const result = generateFetchSnippet(config);

      expect(result).toContain('fetch("https://api.example.com/users"');
      expect(result).toContain('"method": "GET"');
      expect(result).not.toContain("body");
      expect(result).toContain(".then(response => response.json())");
    });

    it("should generate fetch snippet for POST request with body", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: '{"name":"John"}',
      };

      const result = generateFetchSnippet(config);

      expect(result).toContain('"method": "POST"');
      expect(result).toContain('"Content-Type": "application/json"');
      expect(result).toContain('"body": "{\\"name\\":\\"John\\"}"');
    });

    it("should not include body for GET request", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [],
        body: '{"test": true}',
      };

      const result = generateFetchSnippet(config);

      expect(result).not.toContain("body");
    });

    it("should include headers object", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [
          { key: "Authorization", value: "Bearer token" },
          { key: "Accept", value: "application/json" },
        ],
        body: "",
      };

      const result = generateFetchSnippet(config);

      expect(result).toContain('"Authorization": "Bearer token"');
      expect(result).toContain('"Accept": "application/json"');
    });
  });

  describe("generateAxiosSnippet", () => {
    it("should generate axios snippet for GET request", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [],
        body: "",
      };

      const result = generateAxiosSnippet(config);

      expect(result).toContain("axios({");
      expect(result).toContain('"method": "get"');
      expect(result).toContain('"url": "https://api.example.com/users"');
      expect(result).not.toContain('"data"');
    });

    it("should generate axios snippet for POST with JSON body", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: '{"name":"Jane","age":25}',
      };

      const result = generateAxiosSnippet(config);

      expect(result).toContain('"method": "post"');
      expect(result).toContain('"data": {');
      expect(result).toContain('"name": "Jane"');
      expect(result).toContain('"age": 25');
    });

    it("should handle invalid JSON as string", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [],
        body: "plain text data",
      };

      const result = generateAxiosSnippet(config);

      expect(result).toContain('"data": "plain text data"');
    });

    it("should lowercase method name", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users/123",
        method: "DELETE",
        headers: [],
        body: "",
      };

      const result = generateAxiosSnippet(config);

      expect(result).toContain('"method": "delete"');
    });

    it("should include headers", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [{ key: "Authorization", value: "Bearer xyz" }],
        body: "",
      };

      const result = generateAxiosSnippet(config);

      expect(result).toContain('"Authorization": "Bearer xyz"');
    });
  });

  describe("generateXhrSnippet", () => {
    it("should generate XHR snippet for GET request", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [],
        body: "",
      };

      const result = generateXhrSnippet(config);

      expect(result).toContain("const xhr = new XMLHttpRequest()");
      expect(result).toContain(
        'xhr.open("GET", "https://api.example.com/users", true)'
      );
      expect(result).toContain("xhr.send();");
      expect(result).not.toContain('xhr.send("');
    });

    it("should generate XHR snippet for POST with body", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [],
        body: '{"name":"Alice"}',
      };

      const result = generateXhrSnippet(config);

      expect(result).toContain('xhr.open("POST"');
      expect(result).toContain('xhr.send("{\\"name\\":\\"Alice\\"}")');
    });

    it("should include headers with setRequestHeader", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Authorization", value: "Bearer token" },
        ],
        body: "",
      };

      const result = generateXhrSnippet(config);

      expect(result).toContain(
        'xhr.setRequestHeader("Content-Type", "application/json")'
      );
      expect(result).toContain(
        'xhr.setRequestHeader("Authorization", "Bearer token")'
      );
    });

    it("should include onreadystatechange handler", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [],
        body: "",
      };

      const result = generateXhrSnippet(config);

      expect(result).toContain("xhr.onreadystatechange = function()");
      expect(result).toContain("XMLHttpRequest.DONE");
      expect(result).toContain("xhr.status >= 200 && xhr.status < 300");
    });

    it("should not send body for HEAD request", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "HEAD",
        headers: [],
        body: '{"test": true}',
      };

      const result = generateXhrSnippet(config);

      expect(result).toContain("xhr.send();");
      expect(result).not.toContain('xhr.send("');
    });
  });
});
