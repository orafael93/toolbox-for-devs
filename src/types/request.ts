export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

export type Header = {
  key: string
  value: string
}

export type RequestConfig = {
  url: string
  method: HttpMethod
  headers: Header[]
  body: string
}

export type ParsedCurl = RequestConfig

export type SnippetType = 'fetch' | 'axios' | 'xhr'

