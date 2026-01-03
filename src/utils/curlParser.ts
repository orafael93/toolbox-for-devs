import { ParsedCurl, Header, HttpMethod } from '@/types'

export const parseCurl = (curlCommand: string): ParsedCurl => {
  let url = ''
  let method: HttpMethod = 'GET'
  const headers: Header[] = []
  let body = ''

  const cleanedCommand = curlCommand
    .replace(/\\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const methodMatch = cleanedCommand.match(/-X\s+([A-Z]+)|--request\s+([A-Z]+)/)
  if (methodMatch) {
    method = (methodMatch[1] || methodMatch[2]) as HttpMethod
  }

  const urlMatch = cleanedCommand.match(/curl\s+(?:-[^\s]+\s+)*['"]?([^'"?\s]+[^'"\s]*?)['"]?(?:\s|$)/)
  if (urlMatch) {
    url = urlMatch[1]
  } else {
    const simpleUrlMatch = cleanedCommand.match(/https?:\/\/[^\s'"]+/)
    if (simpleUrlMatch) {
      url = simpleUrlMatch[0]
    }
  }

  const headerRegex = /-H\s+['"]([^:]+):\s*([^'"]+)['"]/g
  let headerMatch
  while ((headerMatch = headerRegex.exec(cleanedCommand)) !== null) {
    headers.push({
      key: headerMatch[1].trim(),
      value: headerMatch[2].trim(),
    })
  }

  const dataMatch = cleanedCommand.match(/-d\s+['"](.+?)['"]|--data\s+['"](.+?)['"]|--data-raw\s+['"](.+?)['"]/s)
  if (dataMatch) {
    body = (dataMatch[1] || dataMatch[2] || dataMatch[3] || '').replace(/\\"/g, '"')
  }

  const userMatch = cleanedCommand.match(/-u\s+['"]?([^'"\s]+)['"]?|--user\s+['"]?([^'"\s]+)['"]?/)
  if (userMatch) {
    const credentials = userMatch[1] || userMatch[2]
    const encoded = btoa(credentials)
    headers.push({
      key: 'Authorization',
      value: `Basic ${encoded}`,
    })
  }

  return { url, method, headers, body }
}

