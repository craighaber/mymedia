import './styles.scss'
import Navbar from './features/navbar/components/Navbar/Navbar'
import Home from './features/home/components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './features/login/components/Login/Login'
import Account from './features/account/components/Account/Account'
import { AuthContextProvider } from './globals/context/AuthContext'
import  RoutePaths from './globals/constants/RoutePaths'
import Protected from './features/navbar/components/Protected/Protected'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path={RoutePaths.Home} element={<Home/>} />
          <Route path={RoutePaths.Login} element={<Login/>} />
          <Route path={RoutePaths.Account} element={<Protected><Account/></Protected>} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
