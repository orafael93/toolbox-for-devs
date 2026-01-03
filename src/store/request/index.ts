import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Header, HttpMethod, RequestConfig } from "@/types";

type RequestStore = {
  url: string;
  method: HttpMethod;
  headers: Header[];
  body: string;
  setUrl: (url: string) => void;
  setMethod: (method: HttpMethod) => void;
  setHeaders: (headers: Header[]) => void;
  addHeader: () => void;
  updateHeader: (index: number, key: string, value: string) => void;
  removeHeader: (index: number) => void;
  setBody: (body: string) => void;
  reset: () => void;
  getRequestConfig: () => RequestConfig;
};

const initialState = {
  url: "",
  method: "GET" as HttpMethod,
  headers: [],
  body: "",
};

export const useRequestStore = create<RequestStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUrl: (url: string) => set({ url }),

      setMethod: (method: HttpMethod) => set({ method }),

      setHeaders: (headers: Header[]) => set({ headers }),

      addHeader: () =>
        set((state) => ({
          headers: [...state.headers, { key: "", value: "" }],
        })),

      updateHeader: (index: number, key: string, value: string) =>
        set((state) => {
          const newHeaders = [...state.headers];
          newHeaders[index] = { key, value };
          return { headers: newHeaders };
        }),

      removeHeader: (index: number) =>
        set((state) => ({
          headers: state.headers.filter((_, i) => i !== index),
        })),

      setBody: (body: string) => set({ body }),

      reset: () => set(initialState),

      getRequestConfig: (): RequestConfig => {
        const state = get();

        return {
          url: state.url,
          method: state.method,
          headers: state.headers.filter((h) => h.key.trim() !== ""),
          body: state.body,
        };
      },
    }),
    {
      name: "request-storage",
    }
  )
);
