import { useContext, createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth"
import {auth} from '../../firebase'



const AuthContext: any = createContext({})

// Creates and manages the authorization context, a global state for user information
export const AuthContextProvider = ({children}: any) => {
    const [user, setUser] = useState({})
    const [isUserLoaded, setIsUserLoaded] = useState(false)
    
    const googleLogIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logout = () => {
        signOut(auth)
    }

    // The purpose of the useEffect is just to set up the onAuthStateChange listener when the component mounts
    useEffect(() => {
        // Update the user variable whenever the authorization state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
            // The user is no longer loading (is loaded)
            if (!isUserLoaded) setIsUserLoaded(true)
        })
        // Returning from useEffect means the function (unsubscribe) is called when the component is unmounted to terminate the onAuthStateChanged listener
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        // The values are what are passed globally through the application
        <AuthContext.Provider value={{googleLogIn, logout, isUserLoaded, user}}>
            {children}
        </AuthContext.Provider>
    )
}

// Function that is called to consume/use the authorization context
export const UserAuth = () => {
    return useContext(AuthContext)
}