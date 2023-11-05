import { useState } from 'react'
import './styles.scss'
import Navbar from './features/navbar/components/Navbar'
import Home from './features/home/components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Home/>
    </>
  )
}

export default App
