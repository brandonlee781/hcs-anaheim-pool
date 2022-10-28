import './App.css'
import { Sidebar } from './components/Layout/Sidebar'
import { SchedulePage } from './features/schedule'
import { AppProvider } from './providers/AppProvider'

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="flex flex-row flex-nowrap h-full w-full max-w-[1400px] mx-auto">
          {/* <Sidebar /> */}
          <SchedulePage />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
