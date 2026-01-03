import { describe, it, expect } from "vitest";
import { generateCurl } from "../curlGenerator";
import { RequestConfig } from "@/types";

describe("curlGenerator", () => {
  describe("generateCurl", () => {
    it("should generate simple GET request", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [],
        body: "",
      };

      const result = generateCurl(config);

      expect(result).toBe('curl "https://api.example.com/users"');
    });

    it("should generate POST request with method flag", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [],
        body: "",
      };

      const result = generateCurl(config);

      expect(result).toBe('curl -X POST "https://api.example.com/users"');
    });

    it("should include headers in the curl command", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Authorization", value: "Bearer token123" },
        ],
        body: "",
      };

      const result = generateCurl(config);

      expect(result).toContain('-H "Content-Type: application/json"');
      expect(result).toContain('-H "Authorization: Bearer token123"');
    });

    it("should skip empty headers", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "GET",
        headers: [
          { key: "", value: "" },
          { key: "Content-Type", value: "application/json" },
        ],
        body: "",
      };

      const result = generateCurl(config);

      expect(result).toBe(
        'curl "https://api.example.com/users" -H "Content-Type: application/json"'
      );
    });

    it("should include body with -d flag", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [],
        body: '{"name":"John","age":30}',
      };

      const result = generateCurl(config);

      expect(result).toContain('-d "{\\"name\\":\\"John\\",\\"age\\":30}"');
    });

    it("should escape quotes in body", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [],
        body: '{"message":"Hello "World""}',
      };

      const result = generateCurl(config);

      expect(result).toContain('{\\"message\\":\\"Hello \\"World\\"\\"}"');
    });

    it("should skip empty body", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users",
        method: "POST",
        headers: [],
        body: "   ",
      };

      const result = generateCurl(config);

      expect(result).not.toContain("-d");
    });

    it("should generate complete curl with all options", () => {
      const config: RequestConfig = {
        url: "https://api.example.com/users/123",
        method: "PUT",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Authorization", value: "Bearer abc123" },
        ],
        body: '{"name":"Jane","email":"jane@example.com"}',
      };

      const result = generateCurl(config);

      expect(result).toContain("curl -X PUT");
      expect(result).toContain('"https://api.example.com/users/123"');
      expect(result).toContain('-H "Content-Type: application/json"');
      expect(result).toContain('-H "Authorization: Bearer abc123"');
      expect(result).toContain(
        '-d "{\\"name\\":\\"Jane\\",\\"email\\":\\"jane@example.com\\"}"'
      );
    });
  });
});
