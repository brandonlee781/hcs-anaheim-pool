import './App.css'
import { RouterProvider } from 'react-router-dom'

import { AppProvider } from '@/providers/AppProvider'
import { router } from '@/routes'

import { ReloadPrompt } from './components/Elements/ReloadPrompt'

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="flex flex-row flex-nowrap w-full h-full max-w-[1500px] mx-auto">
          {/* <Sidebar /> */}
          <RouterProvider router={router} />
        </div>
      </div>
      <ReloadPrompt />
    </AppProvider>
  )
}

export default App
