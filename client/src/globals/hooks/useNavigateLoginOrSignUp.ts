import { useNavigate } from "react-router-dom";
import { USER_HAS_LOGGED_IN_BEFORE } from "../constants/localStorage";
import RoutePaths from "../constants/RoutePaths";


// A custom hook that returns a function. This function navigates to the login page if the user has logged in before, otherwise navigates to the sign up page
const useNavigateLoginOrSignUp = () => {
    const navigate = useNavigate()

    const navigateLoginOrSignUp = () => {
        // Navigate to Sign up only if the user has not logged in on the browser or device before
        let path = RoutePaths.SignUp;
        const userHasLoggedInBefore: string | null = localStorage.getItem(USER_HAS_LOGGED_IN_BEFORE);
        if (userHasLoggedInBefore && JSON.parse(userHasLoggedInBefore) === true) {
            path = RoutePaths.Login;
        }
        try {
            navigate(path);
        } catch (error) {
            console.log(error);
        }
    };

    return navigateLoginOrSignUp;
}

export default useNavigateLoginOrSignUp;