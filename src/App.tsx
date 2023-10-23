import { useState } from 'react'
import './styles.scss'
import Navbar from './features/components/navbar/Navbar'
import Home from './features/components/home/Home'

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
