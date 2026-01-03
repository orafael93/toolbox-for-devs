import { Sidebar } from './components'
import { RequestToCurl } from './features/request-to-curl'
import { CurlToSnippets } from './features/curl-to-snippets'
import { useNavigationStore } from './store'

export const App = () => {
  const { currentRoute } = useNavigationStore()

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {currentRoute === 'request-to-curl' && <RequestToCurl />}
          {currentRoute === 'curl-to-snippets' && <CurlToSnippets />}
        </div>
      </main>
    </div>
  )
}

