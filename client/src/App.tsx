import './styles.scss'
import Navbar from './features/navbar/components/Navbar/Navbar'
import Home from './features/home/components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './features/login/components/Login/Login'
import Account from './features/account/components/Account/Account'
import { AuthContextProvider } from './globals/context/AuthContext'
import  RoutePaths from './globals/constants/RoutePaths'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path={RoutePaths.Home} element={<Home/>} />
          <Route path={RoutePaths.Login} element={<Login/>} />
          <Route path={RoutePaths.Account} element={<Account/>} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
