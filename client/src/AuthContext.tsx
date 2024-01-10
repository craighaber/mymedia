import { useContext, createContext } from "react"
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth"
import {auth} from './firebase'



const AuthContext: any = createContext({})


export const AuthContextProvider = ({children}: any) => {
    const googleLogIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }
    return (
        <AuthContext.Provider value={{googleLogIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}