import { describe, it, expect } from "vitest";
import { parseCurl } from "@/utils/curlParser";

describe("curlParser", () => {
  describe("parseCurl", () => {
    it("should parse simple GET request", () => {
      const curl = "curl https://api.example.com/users";

      const result = parseCurl(curl);

      expect(result.method).toBe("GET");
      expect(result.url).toBe("https://api.example.com/users");
      expect(result.headers).toEqual([]);
      expect(result.body).toBe("");
    });

    it("should parse method with -X flag", () => {
      const curl = 'curl "https://api.example.com/users" -X POST';

      const result = parseCurl(curl);

      expect(result.method).toBe("POST");
      expect(result.url).toBe("https://api.example.com/users");
    });

    it("should parse method with --request flag", () => {
      const curl = 'curl "https://api.example.com/users/123" --request DELETE';

      const result = parseCurl(curl);

      expect(result.method).toBe("DELETE");
      expect(result.url).toBe("https://api.example.com/users/123");
    });

    it("should parse headers with -H flag", () => {
      const curl = `curl https://api.example.com/users -H "Content-Type: application/json" -H "Authorization: Bearer token123"`;

      const result = parseCurl(curl);

      expect(result.headers).toHaveLength(2);
      expect(result.headers[0]).toEqual({
        key: "Content-Type",
        value: "application/json",
      });
      expect(result.headers[1]).toEqual({
        key: "Authorization",
        value: "Bearer token123",
      });
    });

    it("should parse user credentials with -u flag", () => {
      const curl = "curl -u user:password https://api.example.com/users";

      const result = parseCurl(curl);

      expect(result.headers).toHaveLength(1);
      expect(result.headers[0].key).toBe("Authorization");
      expect(result.headers[0].value).toBe("Basic " + btoa("user:password"));
    });

    it("should parse user credentials with --user flag", () => {
      const curl = "curl --user admin:secret123 https://api.example.com/data";

      const result = parseCurl(curl);

      expect(result.headers).toHaveLength(1);
      expect(result.headers[0].key).toBe("Authorization");
      expect(result.headers[0].value).toBe("Basic " + btoa("admin:secret123"));
    });

    it("should handle URL with quotes", () => {
      const curl = `curl "https://api.example.com/users?status=active"`;

      const result = parseCurl(curl);

      expect(result.url).toBe("https://api.example.com/users?status=active");
    });

    it("should handle excessive whitespace", () => {
      const curl = `curl    "https://api.example.com/users" -X   POST    -H   "Content-Type: application/json"`;

      const result = parseCurl(curl);

      expect(result.method).toBe("POST");
      expect(result.url).toBe("https://api.example.com/users");
      expect(result.headers[0]).toEqual({
        key: "Content-Type",
        value: "application/json",
      });
    });
  });
});
