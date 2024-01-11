import { useContext, createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth"
import {auth} from '../../firebase'



const AuthContext: any = createContext({})


export const AuthContextProvider = ({children}: any) => {
    const [user, setUser] = useState({})
    const googleLogIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logout = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
            console.log('User', currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        // The values are what are passed globally through the application
        <AuthContext.Provider value={{googleLogIn, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}