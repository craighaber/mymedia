import { Navigate } from "react-router-dom"
import { UserAuth } from "../../../../globals/context/AuthContext"
import RoutePaths from "../../../../globals/constants/RoutePaths"

// Protect pages from being loaded if the user is not logged in
// Protected components are wrapped with <Protected> in App.tsx
const Protected = ({children}: any) => {
    const {user}: any = UserAuth()

    if (!user){
        return <Navigate to={RoutePaths.Home}/>
    }
    return children
}

export default Protected