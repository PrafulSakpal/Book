import React from 'react'
import { useEffect } from 'react'
import { unSetUserToken } from '../../features/authSlice';
import {  removeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        handleLogout();
    }, []);

    const handleLogout = () => {
        // dispatch(unsetUserInfo({ name: "", email: "" }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    return (
        <button onClick={handleLogout}>
          Logout
        </button>
      );

}

export default Logout