import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '../redux/auth/action'


//logout button clear local storage....

const Logout = () => {

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutThunk());
    }
    return (
        <button onClick={logout} className="logoutButton">Logout</button>
    )
}
export default Logout;