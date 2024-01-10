import { useState } from 'react'
import './styles.scss'
import Navbar from './features/navbar/components/Navbar/Navbar'
import Home from './features/home/components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './features/login/components/Login/Login'
import Account from './features/account/components/Account/Account'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>
    </>
  )
}

export default App
