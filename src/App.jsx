import { useState } from 'react'
import people from './people'
import profile from './profile'
import community from './community'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <community/>
      <profile/>
      <people/>

    </nav>
      
    </>
  )
}

export default App
