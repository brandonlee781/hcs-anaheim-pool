import './App.css'
import { RouterProvider } from 'react-router-dom'

import { AppProvider } from '@/providers/AppProvider'
import { router } from '@/routes'

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="flex flex-row flex-nowrap w-full h-full max-w-[1500px] mx-auto">
          {/* <Sidebar /> */}
          <RouterProvider router={router} />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
