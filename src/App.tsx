import { useState } from 'react'
import { AppRouter } from './app/AppRouter'
import { WelcomePage } from './pages/WelcomePage'

const WELCOME_SEEN_KEY = 'digital-wardrobe:welcome-seen'

function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(WELCOME_SEEN_KEY) === '1'
  } catch {
    return true
  }
}

function App() {
  const [showWelcome, setShowWelcome] = useState(() => !hasSeenWelcome())

  function handleEnter() {
    try {
      localStorage.setItem(WELCOME_SEEN_KEY, '1')
    } catch {
      // storage unavailable (private browsing) — just proceed without persisting
    }
    setShowWelcome(false)
  }

  if (showWelcome) {
    return <WelcomePage onEnter={handleEnter} />
  }

  return <AppRouter />
}

export default App
