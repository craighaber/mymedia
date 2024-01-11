import { UserAuth } from '../../../../globals/context/AuthContext';
import './Acount.scss'

function Account(){

    const {user}: any = UserAuth();
    return(
    <>
        <p>Welcome, {user?.email}</p>
    </>)
}

export default Account