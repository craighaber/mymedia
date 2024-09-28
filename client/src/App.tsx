import './styles.scss'
import Navbar from './features/navbar/components/Navbar/Navbar'
import Home from './features/home/components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './features/login/components/Login/Login'
import Account from './features/account/components/Account/Account'
import { AuthContextProvider } from './globals/context/AuthContext'
import  RoutePaths from './globals/constants/RoutePaths'
import Protected from './features/navbar/components/Protected/Protected'
import EditMediaEntry from './features/account/components/EditMediaEntry/EditMediaEntry'
import SignUp from './features/login/components/SignUp/SignUp'
import About from './features/about/components/About/About'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path={RoutePaths.Home} element={<Home/>} />
          <Route path={RoutePaths.About} element={<About/>} />
          <Route path={RoutePaths.Login} element={<Login/>} />
          <Route path={RoutePaths.SignUp} element={<SignUp/>} />
          <Route path={RoutePaths.Account} element={<Protected><Account/></Protected>} />
          <Route path={RoutePaths.MediaEntry} element={<Protected><EditMediaEntry/></Protected>}/>
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
