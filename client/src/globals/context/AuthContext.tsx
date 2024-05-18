import { useContext, createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from '../../firebase'



const AuthContext: any = createContext({})

// Creates and manages the authorization context, a global state for user information
export const AuthContextProvider = ({children}: any) => {
    const [user, setUser] = useState({})

    const createEmailPasswordUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const googleLogIn = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithRedirect(auth, provider)
        } catch (error) {
            console.log(error)
        }
     
    }

    const logout = () => {
        signOut(auth)
    }

    // The purpose of the useEffect is just to set up the onAuthStateChange listener when the component mounts
    useEffect(() => {
        // Update the user variable whenever the authorization state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
        })
        // Returning from useEffect means the function (unsubscribe) is called when the component is unmounted to terminate the onAuthStateChanged listener
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        // The values are what are passed globally through the application
        <AuthContext.Provider value={{googleLogIn, logout, user, createEmailPasswordUser,}}>
            {children}
        </AuthContext.Provider>
    )
}

// Function that is called to consume/use the authorization context
export const UserAuth = () => {
    return useContext(AuthContext)
}