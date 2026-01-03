import { useCurlToSnippets } from './hooks/useCurlToSnippets'
import { CodeDisplay } from '@/components'
import { SnippetType } from '@/types'

const SNIPPET_TABS: { id: SnippetType; label: string }[] = [
  { id: 'fetch', label: 'Fetch API' },
  { id: 'axios', label: 'Axios' },
  { id: 'xhr', label: 'XMLHttpRequest' },
]

export const CurlToSnippets = () => {
  const {
    curlInput,
    setCurlInput,
    activeSnippet,
    setActiveSnippet,
    parsedCurl,
    currentSnippet,
    hasValidInput,
  } = useCurlToSnippets()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-app-text">cURL to Snippets</h2>
        <p className="text-sm text-app-text-secondary mt-1">
          Paste a cURL command and get code snippets
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-app-text mb-2">
          cURL Command
        </label>
        <textarea
          value={curlInput}
          onChange={(e) => setCurlInput(e.target.value)}
          placeholder="curl -X POST https://api.example.com -H 'Content-Type: application/json' -d '{&quot;key&quot;:&quot;value&quot;}'"
          rows={8}
          className="w-full px-4 py-2 bg-app-input border border-app-accent/30 rounded-md text-app-text placeholder-app-text-secondary focus:outline-none focus:ring-2 focus:ring-app-accent font-mono text-sm"
        />
      </div>

      {parsedCurl && (
        <div className="p-4 bg-app-sidebar border border-app-accent/30 rounded-lg">
          <h3 className="text-sm font-semibold text-app-text mb-3">Parsed Request</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-app-text-secondary font-medium min-w-20">Method:</span>
              <span className="text-app-text">{parsedCurl.method}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-app-text-secondary font-medium min-w-20">URL:</span>
              <span className="text-app-text break-all">{parsedCurl.url}</span>
            </div>
            {parsedCurl.headers.length > 0 && (
              <div>
                <span className="text-app-text-secondary font-medium">Headers:</span>
                <ul className="ml-6 mt-1 space-y-1">
                  {parsedCurl.headers.map((h, i) => (
                    <li key={i} className="text-app-text">
                      <span className="text-app-accent">{h.key}</span>: {h.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {parsedCurl.body && (
              <div>
                <span className="text-app-text-secondary font-medium">Body:</span>
                <pre className="ml-6 mt-1 text-app-text whitespace-pre-wrap break-all">
                  {parsedCurl.body}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {hasValidInput && (
        <div>
          <div className="flex gap-2 mb-4">
            {SNIPPET_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSnippet(tab.id)}
                className={`
                  px-4 py-2 rounded-md font-medium text-sm transition-colors
                  ${activeSnippet === tab.id
                    ? 'bg-app-accent text-white'
                    : 'bg-app-sidebar text-app-text hover:bg-app-input'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <CodeDisplay
            code={currentSnippet}
            language="javascript"
            title={SNIPPET_TABS.find((t) => t.id === activeSnippet)?.label}
          />
        </div>
      )}

      {!hasValidInput && curlInput.trim() && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm">
            Unable to parse cURL command. Please check the syntax.
          </p>
        </div>
      )}
    </div>
  )
}

