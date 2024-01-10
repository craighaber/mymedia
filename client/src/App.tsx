import './styles.scss'
import Navbar from './features/navbar/components/Navbar/Navbar'
import Home from './features/home/components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './features/login/components/Login/Login'
import Account from './features/account/components/Account/Account'
import { AuthContextProvider } from './AuthContext'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/account' element={<Account/>} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
