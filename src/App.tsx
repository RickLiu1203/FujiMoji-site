import './App.css'
import LandingPage from './components/LandingPage'
import { Analytics } from '@vercel/analytics/react'

function App() {

  return (
    <>
      <LandingPage />
      <Analytics />
    </>
     
  )
}

export default App
