import { useState, useMemo } from 'react'
import { parseCurl, generateFetchSnippet, generateAxiosSnippet, generateXhrSnippet } from '@/utils'
import { ParsedCurl, SnippetType } from '@/types'

export const useCurlToSnippets = () => {
  const [curlInput, setCurlInput] = useState('')
  const [activeSnippet, setActiveSnippet] = useState<SnippetType>('fetch')

  const parsedCurl: ParsedCurl | null = useMemo(() => {
    if (!curlInput.trim()) return null
    try {
      return parseCurl(curlInput)
    } catch {
      return null
    }
  }, [curlInput])

  const snippets = useMemo(() => {
    if (!parsedCurl) {
      return {
        fetch: '',
        axios: '',
        xhr: '',
      }
    }

    return {
      fetch: generateFetchSnippet(parsedCurl),
      axios: generateAxiosSnippet(parsedCurl),
      xhr: generateXhrSnippet(parsedCurl),
    }
  }, [parsedCurl])

  const currentSnippet = snippets[activeSnippet]

  return {
    curlInput,
    setCurlInput,
    activeSnippet,
    setActiveSnippet,
    parsedCurl,
    currentSnippet,
    hasValidInput: !!parsedCurl,
  }
}

