import { useRegisterSW } from 'virtual:pwa-register/react'

const intervalMS = 60 * 60 * 1000

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update()
        }, intervalMS)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="p-0 m-0 h-0 w-0">
      {(offlineReady || needRefresh) && (
        <div className="fixed right-0 bottom-0 m-4 p-3 border border-gray-100 rounded-md shadow-md bg-gray-900">
          <div className="mb-2">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>New content available, click on reload button to update.</span>
            )}
          </div>
          {needRefresh && (
            <button
              className="border border-gray-100 outline-none mr-1 rounded-sm py-1 px-3"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            className="border border-gray-100 outline-none mr-1 rounded-sm py-1 px-3"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
